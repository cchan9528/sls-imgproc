const axios = require('axios');
const UPLOADDELIM = process.env.uploaddelim;

async function handler(event, context) {
    let uploads = event.Records.reduce(function(userToInstances, obj) {
        let [, user, instance] = obj.s3.object.key.split(UPLOADDELIM);
        if (!userToInstances[user]) {
            userToInstances[user] = [];
        }
        if (instance) {
            userToInstances[user].push(instance);
        }
        return userToInstances;
    }, {});
    console.log("uploads");
    console.log(uploads);
    try {
        //////////////////////////////////////////////////
        // Notify users upload(s) worked
        //////////////////////////////////////////////////
        let res = await Promise.all(Object.keys(uploads).map(function(user) {
            console.log("sending to user");
            console.log(user);
            let conn = `http://localhost:3001/@connections/${user}`;
            return axios.post(conn, {
                'statusCode': 200,
                'success': uploads[user]
            });
        }));
        console.log(res);
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