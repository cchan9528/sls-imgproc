const axios = require('axios');
const UPLOADDELIM = process.env.uploaddelim;

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
    'handler': handler
}
