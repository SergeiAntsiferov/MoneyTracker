import { app, jsonParser } from '../app.mjs';
import catch_handler from '../functions/catch_handler.mjs'
import { db, sample_supplies } from '../connections/mongo_connect.mjs'
import { ObjectID } from '../connections/mongo_connect.mjs';


function modifiyIdKeys(array) {
    return array.map((item) => {
        const id = item["_id"]
        delete item["_id"]
        return { id: id, ...item }
    })
}

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

// Get categories
app.get("/get_categories", jsonParser, async (request, response) => {
    try {
        const categories = db.collection('categories');
        
        const result = await categories.find().toArray();
        const prepareResult = modifiyIdKeys(result)

        response.json(prepareResult) // send response to frontend
    } catch(error) { 
        catch_handler(error, "/get_categories") 
    }
});

// Get transactions
app.post("/get_transactions", jsonParser, async (request, response) => {
    try {
        const { range } = request.body
        
        const sales = sample_supplies.collection('sales');
        let result;

        if (range) {
            const prapareRange = range.map(id => ObjectID(id))
            result = await sales.find({ 
                _id : { 
                    $in : prapareRange 
                }
            }).toArray(); // get data in range
        } else {
            result = await sales.distinct("_id", {}) // get only id
        }
        
        response.json(result) // send response to frontend
    } catch(error) { 
        catch_handler(error, "/get_transactions") 
    }
});

// categories handling
app.post("/handle_categories", jsonParser, async (request, response) => {
    try {

        const { action, category, id } = request.body
        const categories = db.collection('categories');

        switch(action) {

            case "create": {

            }
            break;

            case "edit": {
                const { id, title, type } = category
                await categories.updateOne({_id: ObjectID(id)}, {$set: {title: title, type: type}})
                response.json("success") // send response to frontend
            }
            break;

            case "delete": {
                await categories.deleteOne({_id: ObjectID(id)})
                response.json("success") // send response to frontend
            }
            break;

            default: response.json("default")
        }
    } catch(error) { 
        catch_handler(error, "/handle_categories") 
    }
});
