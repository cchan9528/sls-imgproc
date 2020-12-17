const AWS = require('aws-sdk');

async function upload(options) {
    const s3client = new AWS.S3({
        s3ForcePathStyle: true,
        accessKeyId: process.env.s3accessKeyId,
        secretAccessKey: process.env.s3secretAccessKey,
        endpoint: new AWS.Endpoint('http://'+process.env.s3host+':'+process.env.s3port),
    });
    let res = await s3client.putObject({
        Bucket: 'local-bucket',
        Key: 'upload/123/456',
        Body: new Buffer('cdasdsdf')
    }).promise();
    return res;
};

function selectAlgorithm(x) {
    let algorithm = null;
    switch (x.toUpperCase()) {
        case 'ALGO1':
            return '/path/to/executable/algorithm/1';
            break;
        case 'ALGO2':
            return '/path/to/executable/algorithm/2'
            break;
        default:
            return '/path/to/executable/algorithm/0'
    }
    return algorithm;
}

async function downloadInputs(imgS3Path, localpath){
    const s3client = new AWS.S3({
        s3ForcePathStyle: true,
        accessKeyId: process.env.s3accessKeyId,
        secretAccessKey: process.env.s3secretAccessKey,
        endpoint: new AWS.Endpoint('http://'+process.env.s3host+':'+process.env.s3port),
    });
    try {
        let localpath = localpath ? localpath : '/local/inpath';
        let res = await s3client.getObject({
            Bucket: 'local-bucket',
            Key: 'upload/123/456',
            Body: new Buffer('cdasdsdf')
        }).promise();
        return {'path' : localpath};
    } catch (err) {
        return {'err' : 'failed downloading image from S3'};
    }
};

async function runAlgorithm(algorithm, inpath, outpath) {
    let outpath = outpath ? outpath : '/local/outpath'
    let outfile = fs.open(outpath);
    let res = null;
    try{
        let output = subprocess.exec(algorithm, inpath);
        outfile.write(output);
        res = {'output' : output};
    } catch(err) {
        res = {'err' : err};
    } finally {
        outfile.close();
    }
    return res;
};

async function processImage(options){
    try{
        let algorithm = selectAlgorithm(options.algorithm);
        let inpath = await downloadInputs(options.imgS3Path).path;
        let outpath = await runAlgorithm( algorithm, inpath, outpath ).output;
        let s3Response = await upload({
            'output' : outpath,
            'uid' : options.uid
        });
    } catch (err) {
        if (err.processing) {
            return {'err':'processing'};
        } else {
            return {'err':'uploading'};
        }
    }
}

module.exports = {
    'processImage' : processImage
}
