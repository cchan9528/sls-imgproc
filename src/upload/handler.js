'use strict';

const AWS = require('aws-sdk');

async function upload(event, context) {
    const s3client = new AWS.S3({
        s3ForcePathStyle: true,
        accessKeyId: process.env.s3accessKeyId,
        secretAccessKey: process.env.s3secretAccessKey,
        endpoint: new AWS.Endpoint('http://'+process.env.s3host+':'+process.env.s3port),
    });
    try{
        let res = await s3client.putObject({
            Bucket: 'local-bucket',
            Key: '321',
            Body: new Buffer('cdasdsdf')
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
};


async function s3Hook(event, context){
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(context));
    console.log(JSON.stringify(process.env));
}


module.exports = {
    'upload' : upload,
    's3Hook' : s3Hook
}
