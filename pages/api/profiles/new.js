// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
    const { body } = req
    console.log("Saving... ", body.username);
    return new Promise((resolve, reject) => {
        db.collection('testepratico').doc('one').collection('profiles').doc(uuidv4()).set(body).then(e => {
            console.log(e);
            res.statusCode = 200;
            res.json(JSON.stringify(`Hello ${body.username}, you just parsed the request body!`));
            return resolve();
        }, (err) => {
            console.log(err);
            res.statusCode = 405;
            res.json(err);
            return resolve();
        })
    });
}