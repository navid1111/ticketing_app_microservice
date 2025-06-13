import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
let mongo:any;
beforeAll(async()=>{
     mongo = new MongoMemoryServer();

    const mongoUri=await mongo.getUri();
    await mongoose.connect(mongoUri,{

    })

})

beforeEach(async()=>{
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not established.');
    }
    const collections = await db.collections();
    for(let collection of collections){

    }
})

afterAll(async()=>{
    await mongo.stop();
    await mongoose.connection.close();
})