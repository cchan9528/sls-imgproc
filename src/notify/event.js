const axios = require('axios');
const UPLOADDELIM = process.env.uploaddelim;

async function handler(event, context) {
    let sendNotificationsTo = event.Records.reduce(function(successful, obj) {
        // The 'Key' format is taken from presigned/operations.js
        let [, user] = obj.s3.object.key.split(UPLOADDELIM);
        successful.push(user);
        return successful;
    }, []);
    try {
        //////////////////////////////////////////////////
        // Notify users upload(s) worked
        //////////////////////////////////////////////////
        let res = await Promise.all(sendNotificationsTo.map(function(user) {
            let conn = `http://localhost:3001/@connections/${user}`;
            return axios.post(conn, {
                'statusCode': 200,
                'success': true
            });
        }));
    } catch (err) {
        //////////////////////////////////////////////////
        // To Be Implemented
        //////////////////////////////////////////////////
        console.log("could not send notification to user");
    }
};

module.exports = {
    'handler': handler
}