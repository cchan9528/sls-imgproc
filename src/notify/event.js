const axios = require('axios');
const UPLOADDELIM = process.env.uploaddelim;

async function handler(event, context){
    let uploads = event.Records.reduce(function(userToInstances, obj){
        let [ , user, instance] = obj.s3.object.key.split(UPLOADDELIM);
        if (!userToInstances[user]) {
            userToInstances[user] = [];
        }
        userToInstances[user].push(instance);
        return userToInstances;
    }, {});
    try {
        //////////////////////////////////////////////////
        // Notify users upload(s) worked
        //////////////////////////////////////////////////
        let res = await Promise.all(Object.keys(uploads).map(function(user){
            let conn = `http://localhost:3001/@connections/${user}`;
            return axios.post(conn, {
                'statusCode' : 200,
                'success' : uploads[user]
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
    'handler': handler
}
