const AWS = require('aws-sdk');

async function getPresignedUrl(options, cb) {
    let url = 'http://'+process.env.s3host+':'+process.env.s3port;
    const s3client = new AWS.S3({
        s3ForcePathStyle: true,
        accessKeyId: process.env.s3accessKeyId,
        secretAccessKey: process.env.s3secretAccessKey,
        endpoint: new AWS.Endpoint(url),
    });
    s3client.createPresignedPost({
        Bucket : process.env.s3bucket,
        Expires : 120, // expires in 120 seconds
        Conditions : [], // Conditions for good upload (e.g. tags, size, etc)
        Fields : {
            key : `upload/${options.uid}`,
        }
    }, function(err, presignedurl){ cb(err, presignedurl); });
};

module.exports = {
    'getPresignedUrl' : getPresignedUrl
};
