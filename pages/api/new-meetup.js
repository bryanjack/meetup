// POST /api/new-meetup

import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        // const { title, image, address, description } = data;
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017/meetups?readPreference=primary&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&directConnection=true&ssl=false')
        const db = client.db()
        const meetupsCollection = db.collection('meetups-col')
        const result = await meetupsCollection.insertOne({data})
        console.log(result)

        res.status(201).json({message: "Meetup inserted"})
    }
}

export default handler;