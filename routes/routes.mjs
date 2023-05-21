import express, { json } from "express"; // express library
import catch_handler from '../functions/catch_handler.mjs'
import { objectID, db, sample_supplies } from '../connections/mongo_connect.mjs'

export const router = express.Router()
const jsonParser = json() // JSON parsing

// Get transactions
router.post("/get_transactions", jsonParser, async (request, response) => {
    try {
        console.log("request - get_transactions. Body: ", request.body)
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

// Get data for charts
router.post("/get_chart_data", jsonParser, async (request, response) => {
    try {
        console.log("request - get_chart_data. Body: ", request.body)
        const { charts } = request.body
        const sales = sample_supplies.collection('sales');
        let resData = {}

        for (const chart of charts) {
            resData[chart.title] = {}
            const result = await sales.aggregate([
                { $group: { _id: `$${chart.field}`, count: { $sum: 1 } } },
                { $sort: { count: 1 } }
            ]).toArray();
        
            resData[chart.title].labels = result.map((item) => {
                const type = typeof item["_id"]
                if (type === 'number') return item["_id"].toString()
                if (type === 'boolean') return item["_id"] ? "Yes" : "No"
                else return item["_id"]
            })
            resData[chart.title].values = result.map(item => item.count)
        }
        response.json(resData) // send response to frontend
    } catch(error) { 
        catch_handler(error, "/get_chart_data") 
    }
});