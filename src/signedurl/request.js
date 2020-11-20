const axios = require('axios');
const operations = require('./operations.js');

async function handler(event, context){
    let options = { 'uid' : event.requestContext.connectionId };
    operations.getSignedURL(options, async function(err, url){
        let res = {};
        if (err) {
            res.statusCode = 500;
            res.err = JSON.stringify(err);
        } else {
            res.statusCode = 200;
            res.body = JSON.stringify(key);
        }
        try {
            let user = `http://localhost:3001/@connections/${options.uid}`;
            await axios.post(user, res);
        }
        catch (err) {
            console.log(err);
        }
    });
}

module.exports = {
    'handler': handler
}
