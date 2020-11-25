const axios = require('axios');
const operations = require('./operations.js');
const UPLOADDELIM = process.env.uploaddelim;

async function test_handler(event, context){
    let options = {}; // parse options here
    let res = {};
    try {
        key = await operations.upload(options);
        res.statusCode = 200;
        res.body = JSON.stringify(key);
    } catch (err) {
        res.statusCode = 500;
        res.err = JSON.stringify(err);
    }
    return res;
}

async function handler(event, context){
    let uploads = event.Records.reduce(function(acc, obj){
        let [ , uid, instance] = obj.s3.object.key.split(UPLOADDELIM);
        if (!acc[uid]) {
            acc[uid] = [];
        }
        acc[uid].push(instance);
        return acc;
    }, {});
    try {
        //////////////////////////////////////////////////
        // Notify users upload worked
        //////////////////////////////////////////////////
        let res = await Promise.all(Object.keys(uploads).map(function(uid){
            let user = `http://localhost:3001/@connections/${uid}`;
            return axios.post(user, {
                'statusCode' : 200,
                'success' : uploads[uid]
            });
        }));
    } catch (err) {
        //////////////////////////////////////////////////
        // To Be Implemented
        //////////////////////////////////////////////////
        console.log(err);
    }
};

module.exports = {
    'handler': handler,
    'test_handler' : test_handler
}
