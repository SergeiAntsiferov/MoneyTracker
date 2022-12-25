import { app, jsonParser } from '../app.mjs';
import catch_handler from '../functions/catch_handler.mjs'

// Main route
app.post("/", jsonParser, async (request, response) => {
    try {
        response.json("Hello from server!") // отправка ответа на фронтенд
    } catch(error) { 
        catch_handler(error, "/") 
    }
});