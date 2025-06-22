import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import  jwt from 'jsonwebtoken';
import { json } from 'express';

declare global {
    // eslint-disable-next-line no-var
    var signin: () => string[];
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';
    
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not established.');
    }
    const collections = await db.collections();
    
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = () => {
    // Build a json payload {id,email}
    const payload = {
        id: "1lk24j124l",
        email: "test@test.com"
    }

    // create the jsonwebtoken
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // build up the session object {jwt:MY_JWT}
    const session = {jwt: token}

    // turn the session into json
    const sessionJSON = JSON.stringify(session)

    // take the json and encode it as base 64
    const base64 = Buffer.from(sessionJSON).toString('base64')

    // Return just the base64 encoded session, not the full cookie string
    return [`session=${base64}`]
}