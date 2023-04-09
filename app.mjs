import express, { json } from "express"; // express library
import cors from "cors"; // CORS module to prevent CORS errors 
import path from "path"
import ('./routes/routes.mjs')
import * as dotenv from 'dotenv';
dotenv.config();

export const app = express(); // use express library
export const jsonParser = json() // JSON parsing
const __dirname = path.resolve(path.dirname(''))

app.use(cors()) // use CORS 

let port = process.env.API_PORT
if (port) app.listen(port) // port listening

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'),(err) => {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
    app.post("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'),(err) => {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}