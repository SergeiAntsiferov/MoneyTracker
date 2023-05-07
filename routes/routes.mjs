import express, { json } from "express"; // express library
import catch_handler from '../functions/catch_handler.mjs'
import { objectID, db, sample_supplies } from '../connections/mongo_connect.mjs'

export const router = express.Router()
const jsonParser = json() // JSON parsing

// Get current color theme
router.get("/get_theme", jsonParser, async (request, response) => {
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
router.post ("/change_theme", jsonParser, async (request, response) => {
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
router.post("/get_transactions", jsonParser, async (request, response) => {
    try {
        const { range, sort } = request.body
        const sales = sample_supplies.collection('sales');
        let result;

        if (range) {
            const prapareRange = range.map(id => objectID(id))
            result = await sales.find({ _id : { $in : prapareRange } }).toArray() // get data in range
                        
        } else if (sort) {
            const { field, sorting } = sort
            if (!sorting) result = await sales.distinct("_id", {}) // get only id
            else {
                let array = [] // array for results
                sales.find({}, {
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

// function modifiyIdKeys(array) {
//     return array.map((item) => {
//         const id = item["_id"]
//         delete item["_id"]
//         return { id: id, ...item }
//     })
// }