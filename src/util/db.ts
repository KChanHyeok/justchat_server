import { MongoClient, ServerApiVersion } from "mongodb";
import path from 'path'
import dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '../../.env')})
const uri: any = process.env.DB_URI

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async() => {
    try {
        await client.connect()
        console.log('DB connection')
    } catch (err) {
        console.log(err)
    } 
}

const clietDB = client.db('just_chat')

export { client, run, clietDB}