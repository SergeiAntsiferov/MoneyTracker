import express, { json } from "express"; // express library
import catch_handler from '../functions/catch_handler.mjs'
import { objectID, db, sample_supplies } from '../connections/mongo_connect.mjs'

export const router = express.Router()
const jsonParser = json() // JSON parsing

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