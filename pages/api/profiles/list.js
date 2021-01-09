// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../lib/firebase';

export default async (req, res) => {
    console.log('Listing...');
    var ar = [];
    return new Promise((resolve, reject) => {
        db.collection('testepratico').doc('one').collection('profiles').get().then(e => {
            e.forEach(item => {
                ar.push(item.data());
            });
            res.statusCode = 200;
            res.json(JSON.stringify(ar));
            return resolve();
        }, (err) => {
            console.log(err);
            res.statusCode = 405;
            res.json(err);
            return resolve();
        })
    });
}
