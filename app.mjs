import express, { json } from "express"; // express library
import cors from "cors"; // CORS module to prevent CORS errors 
import path from "path"
// import ('./routes/routes.mjs')
import * as dotenv from 'dotenv';
dotenv.config();

export const app = express(); // use express library
export const jsonParser = json() // JSON parsing
const __dirname = path.resolve(path.dirname(''))

app.use(cors()) // use CORS 

let port = process.env.API_PORT
if (port) {
    app.listen(port) // port listening
    console.log("Server is running on " + port + " port")
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'frontend', 'build', 'index.html'),
            (error) => {
                if(error) res.status(500).send(error)
            }
        );
    })
    app.post("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'frontend', 'build', 'index.html'),
            (error) => {
                if(error) res.status(500).send(error)
            }
        );
    })
}