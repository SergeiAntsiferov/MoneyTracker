import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const login = process.env.MONGO_LOGIN // mongo auth login
const password = process.env.MONGO_PASS // mongo auth password

const uri = `mongodb+srv://${login}:${password}@main.eb7yrb9.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
export const mongo = new MongoClient(uri);