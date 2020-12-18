const childProcess = require('child_process');
const S3Client = require('./aws/S3Client.js');

function selectAlgorithm(x) {
    let algorithm = 'test';
    switch (x.toUpperCase()) {
        case 'ALGO1':
            algorithm = 'testagain';
            break;
        case 'ALGO2':
            algorithm = 'testagainagain'
            break;
    }
    return process.env.algorithms + '/' + algorithm;
}

async function runAlgorithm(algorithm, inpath, outpath, options) {
    let outpath = outpath ? outpath : '/local/outpath';
    if (!inpath) {
        throw ReferenceError(`Invalid inpath: ${inpath}`);
    }
    await childProcess.execFile(algorithm, inpath, outpath, options);
};

async function processImage(options){
    let s3Client = new S3Client();
    let inpath = await s3Client.download(options.imgS3Path);
    let algorithm = selectAlgorithm(options.algorithm);
    let outpath = await runAlgorithm(algorithm, inpath, outpath, options);
    let s3Response = await s3Client.upload({
        'output' : outpath,
        'uid' : options.uid
    });
}

module.exports = {
    'processImage' : processImage
}
