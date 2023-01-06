import { app, jsonParser } from '../app.mjs';
import catch_handler from '../functions/catch_handler.mjs'
import { db } from '../connections/mongo_connect.mjs'

// Get current color theme
app.get("/get_theme", jsonParser, async (request, response) => {
    try {
        const styles = db.collection('styles');
        const query = { active: true };
        const result = await styles.findOne(query);

        response.json(result) // send response to frontend
    } catch(error) { 
        catch_handler(error, "/get_theme") 
    }
});

// Change current color theme
app.post ("/change_theme", jsonParser, async (request, response) => {
    try {
        const { current_theme } = request.body

        const requestedTopic = current_theme?.type === "dark" ? "light" : "dark"

        const styles = db.collection('styles');

        await styles.updateOne({type: current_theme?.type}, {$set: {active: false}})
        await styles.updateOne({type: requestedTopic}, {$set: {active: true}})

        const query = { type: requestedTopic };
        const result = await styles.findOne(query);

        response.json(result) // send response to frontend

    } catch(error) { 
        catch_handler(error, "/change_theme") 
    }
});