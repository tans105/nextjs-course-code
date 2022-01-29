// api route to /api/new-meetup
import {MongoClient} from "mongodb";

/**
 * req has header, method like POST, GET
 * @param req
 * @param res
 */
async function handler(req, res) {
  const {method, body} = req

  if (method === 'POST') {
    //trigger for post request

    const {title, image, address, description} = body;
    const client = await MongoClient.connect('mongodb+srv://tans105:admin123@cluster0.htrct.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(body);
    console.log(result);

    await client.close();
    res.status(201).json({message: 'Meetup inserted'});
  }

}

export default handler;