import express from "express"; // express library
import cors from "cors"; // CORS module to prevent CORS errors 
import { router } from './routes/routes.mjs'

const app = express(); // use express library

app.use(cors()) // use CORS 
app.use('/api', router) // hadle all the routes on "/api"

let port = process.env.API_PORT
if (port) app.listen(port) // port listening