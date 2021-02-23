const axios = require('axios');
const operations = require('./operations.js');

const APIGATEWAY = 'http://localhost:3001/@connections'

async function handler(event, context) {
    let uid = event.requestContext.connectionId;
    let res = {};
    try {
        res.body = await operations.getPresignedS3Access({
            uid
        });
        res.statusCode = 200;
    } catch (err) {
        res.err = JSON.stringify(err);
        res.statusCode = 500;
    }
    await axios.post(`${APIGATEWAY}/${uid}`, res);
};

module.exports = {
    'handler': handler
}