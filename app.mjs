import express, { json } from "express"; // express library
import cors from "cors"; // CORS module to prevent CORS errors 
import ('./routes/routes.mjs')
import * as dotenv from 'dotenv';
dotenv.config();

export const app = express(); // use express library
export const jsonParser = json() // JSON parsing

app.use(cors()) // use CORS 

let port = process.env.API_PORT
if (port) app.listen(port) // port listening

app.get("/", (req, res) => {
    res.send("test transactions server on " + port + " port")
})