const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const DLM = process.env.UPLOADDELIM;

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

    async download(ws, uid){
        //////////////////////////////////////////////
        // Download image
        //////////////////////////////////////////////
        let image = await this._s3Client.getObject({
            Bucket : this._bucket,                   // S3 Bucket
            Key : `inputs${DLM}${ws}${DLM}${uid}`    // Image path in S3 Bucket
        }).promise();

        //////////////////////////////////////////////
        // Write file locally so it can be processed
        //////////////////////////////////////////////
        let localpath = path.join('/tmp', ws, uid);
        await fs.writeFile(localpath, image.data, image.ContentEncoding);

        //////////////////////////////////////////////
        // Return where file was saved
        //////////////////////////////////////////////
        return localpath;
    }

    async upload(img){
        const [ , ws, uid] = img.split(DLM);         // websocket id, img uid

        //////////////////////////////////////////////
        // Upload image (e.g. outputs of processing)
        //////////////////////////////////////////////
        let res = await this._s3Client.putObject({
            Bucket: this._bucket,                  // Target S3 Bucket
            Key: `outputs${DLM}${ws}${DLM}${uid}`, // Path in bucket
            Body: new Buffer('cdasdsdf')           // Data to store at path
        }).promise();

        return res;
    }
}

module.exports = S3Client;
