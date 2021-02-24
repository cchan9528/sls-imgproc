'use strict';

const Axios = require('axios');
const FormData = require('form-data');
const WebSocket = require('ws');

test('Notify on S3 Upload', function(done) {
    listenForNotifications(function(data) {
        try {
            data = JSON.parse(data);
            console.log(data);
        } catch (err) {
            done(err);
        }
    });
    let res = uploadObjectToServerlessOffline();
    console.log(`res: ${JSON.stringify(res)}`);
});

function listenForNotifications(onMessage) {
    const serverlessOffline = 'ws://localhost:3001';
    const ws = new WebSocket(serverlessOffline);
    ws.on('message', onMessage);
    return ws;
}

async function uploadObjectToServerlessOffline(cb) {
    let presignedInfo = getPresignedInfo();
    let formData = new FormData();
    Object.entries(presignedInfo.fields).forEach(function(entry) {
        const [field, value] = entry;
        console.log(field);
        console.log(value);
        formData.append(field, value);
    });
    formData.append('file', Buffer.from('hello, world!', 'utf8'));
    let formOptions = {
        headers: formData.getHeaders()
    };
    console.log(formData);
    console.log(formOptions);
    let res;
    try {
        res = await Axios.post(presignedInfo.url, formData, formOptions);
        console.log("hi?");
    } catch (err) {
        res = "failed";
        console.log("failed");
        console.log(err);
    }
    return res;
}


function getPresignedInfo() {
    const presignedInfoServerlessS3Local = {
        url: 'http://localhost:4569/local-bucket',
        fields: {
            key: 'upload/cklj1tc4h0000p2fydx7c63ai',
            bucket: 'local-bucket',
            'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
            'X-Amz-Credential': 'S3RVER/20210224/us-east-1/s3/aws4_request',
            'X-Amz-Date': '20210224T062016Z',
            Policy: 'eyJleHBpcmF0aW9uIjoiMjAyMS0wMi0yNFQwNjoyMjoxNloiLCJjb25kaXRpb25zIjpbeyJrZXkiOiJ1cGxvYWQvY2tsajF0YzRoMDAwMHAyZnlkeDdjNjNhaSJ9LHsiYnVja2V0IjoibG9jYWwtYnVja2V0In0seyJYLUFtei1BbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJYLUFtei1DcmVkZW50aWFsIjoiUzNSVkVSLzIwMjEwMjI0L3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IlgtQW16LURhdGUiOiIyMDIxMDIyNFQwNjIwMTZaIn1dfQ == ',
            'X-Amz-Signature': 'aa6e3de40bd151bfbbed8ecef652dd0f8890541716e23838848e78e2bcaaaa32'
        }
    };
    Object.freeze(presignedInfoServerlessS3Local);
    return presignedInfoServerlessS3Local;
}