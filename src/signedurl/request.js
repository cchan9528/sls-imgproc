const operations = require('./operations.js');

async function handler(event, context){
    let options = {}; // parse options here
    let res = {};
    try {
        key = await operations.getSignedURL(options);
        res.statusCode = 200;
        res.body = JSON.stringify(key);
    } catch (err) {
        res.statusCode = 500;
        res.err = JSON.stringify(err);
    }
    return res;
}

module.exports = {
    'handler': handler
}
