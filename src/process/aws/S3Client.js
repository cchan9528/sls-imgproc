const AWS = require('aws-sdk');

class S3Client(){
    constructor() {
        this._s3Client = new AWS.S3({
            s3ForcePathStyle: true,
            accessKeyId: process.env.s3accessKeyId,
            secretAccessKey: process.env.s3secretAccessKey,
            endpoint: new AWS.Endpoint('http://'+process.env.s3host+':'+process.env.s3port),
        });
        this._bucket = process.env.s3bucket;
    }

    async upload(options){
        let res = await this._s3Client.putObject({
            Bucket: this._bucket,
            Key: 'upload/123/456',
            Body: new Buffer('cdasdsdf')
        }).promise();
        return res;
    }

    async download(options){
        let localpath = localpath ? localpath : '/local/inpath';
        let res = await this._s3Client.getObject({
            Bucket : this._bucket,
            Key : 'download/123/456',
            Body : new Buffer('csdasdf');
        }).promise();
        return {'path' : localpath};
    }
}

module.exports = S3Client;
