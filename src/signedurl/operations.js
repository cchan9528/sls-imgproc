const AWS = require('aws-sdk');

async function getSignedURL(options) {
    const s3client = new AWS.S3({
        s3ForcePathStyle: true,
        accessKeyId: process.env.s3accessKeyId,
        secretAccessKey: process.env.s3secretAccessKey,
        endpoint: new AWS.Endpoint('http://'+process.env.s3host+':'+process.env.s3port),
    });
    let signedURL = await s3client.getSignedURL('putObject', {
        'Bucket' : bucket,
        'Key' : `upload/${uuidv4()}`
    }).promise();
    return signedURL;
};

module.exports = {
    'getSignedURL' : getSignedURL
};
