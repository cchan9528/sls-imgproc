const AWS = require('aws-sdk');

async function getSignedURL(options, cb) {
    const s3client = new AWS.S3({
        s3ForcePathStyle: true,
        accessKeyId: process.env.s3accessKeyId,
        secretAccessKey: process.env.s3secretAccessKey,
        endpoint: new AWS.Endpoint('http://'+process.env.s3host+':'+process.env.s3port),
    });
    s3client.getSignedURL('putObject', {
        'Bucket' : process.env.s3bucket,
        'Key' : `upload/${options.uid}`,
        'Expires' : 60 // expires in 60 seconds
    }, function(err, signedurl){ cb(err, signedurl); });
};

module.exports = {
    'getSignedURL' : getSignedURL
};
