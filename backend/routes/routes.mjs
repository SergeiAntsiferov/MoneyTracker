import { app, jsonParser } from '../app.mjs';
import catch_handler from '../functions/catch_handler.mjs'
import { mongo } from '../connections/mongo_connect.mjs'

// Main route
app.post("/", jsonParser, async (request, response) => {
    try {

        const database = mongo.db('sample_mflix');
        const movies = database.collection('movies');
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);
        console.log(movie)
        response.json("Hello from server!") // отправка ответа на фронтенд
    } catch(error) { 
        catch_handler(error, "/") 
    }
});