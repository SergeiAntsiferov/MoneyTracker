import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const login = process.env.MONGO_LOGIN // mongo auth login
const password = process.env.MONGO_PASS // mongo auth password

const uri = `mongodb+srv://${login}:${password}@main.eb7yrb9.mongodb.net/?retryWrites=true&w=majority`;

const mongo = new MongoClient(uri);

export const ObjectID = ObjectId
export const db = mongo.db('money_tracker');
export const sample_supplies = mongo.db('sample_supplies');
