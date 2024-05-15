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
        console.log('db연결')
    } catch (err) {
        console.log(err)
    } 
}


export { client, run}