const operations = require('./operations.js');

async function handler(event, context){
    let options = {}; // parse options here
    let res = await operations.upload(options);
    return res;
}

module.exports = {
    'handler': handler
}
