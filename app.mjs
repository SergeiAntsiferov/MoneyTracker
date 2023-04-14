import express, { json } from "express"; // express library
import cors from "cors"; // CORS module to prevent CORS errors 
import catch_handler from './functions/catch_handler.mjs'
import { db, sample_supplies } from './connections/mongo_connect.mjs'
import { ObjectID } from './connections/mongo_connect.mjs';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express(); // use express library
const jsonParser = json() // JSON parsing

app.use(cors({
    origin: [
        "http://antsiferov-transactions.vercel.app", 
        "http://localhost:3001"
    ]
})) // use CORS 

let port = process.env.API_PORT
// if (port) app.listen(port) // port listening

const server = app.listen(port)                 // Прослушивание порта
export const serverAddress = server.address()   // export

app.get("/", (req, res) => {
    res.send(JSON.stringify(serverAddress))
    // res.send("test transactions server on " + port + " port")
})


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

// Get transactions
app.post("/get_transactions", jsonParser, async (request, response) => {
    try {
        const { range, sort } = request.body
        const sales = sample_supplies.collection('sales');
        let result;

        if (range) {
            const prapareRange = range.map(id => ObjectID(id))
            result = await sales.find({ _id : { $in : prapareRange } }).toArray() // get data in range
                        
        } else if (sort) {
            const { field, sorting } = sort
            if (!sorting) result = await sales.distinct("_id", {}) // get only id
            else {
                let array = [] // array for results
                await sales.find({}, {
                    sort: { [field]: sorting }, // sorting parameter
                    projection: { "_id": 1 } // necessary fields
                }).forEach(item => array.push(item["_id"])) // write results to array
                result = array
            }
        } else result = await sales.distinct("_id", {}) // get only id

        response.json(result) // send response to frontend
    } catch(error) { 
        catch_handler(error, "/get_transactions") 
    }
});