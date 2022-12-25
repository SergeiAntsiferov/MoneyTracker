'use strict'
import express, { json } from "express"; // express library
import cors from "cors"; // CORS module to prevent CORS errors 
import ('./routes/routes.mjs') // routes handling

export const app = express(); // use express library
export const jsonParser = json() // JSON parsing

// Requests from origin will not blocks by CORS policy
const corsProps = cors({
    origin: ["http://localhost:3001"]
}) 

app.use(corsProps) // use CORS 
app.listen(4001) // port listening
