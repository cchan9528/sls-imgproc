'use strict';

const Axios = require('axios');
const FormData = require('form-data');
const WebSocket = require('ws');

test('Notify on S3 Upload', function(done) {
    let connected = false;
    listenForNotifications(function(data) {
        const message = JSON.parse(data);
        console.log(message);
        if (!connected) {
            connected = true;
            uploadObjectToServerlessOffline(message.body);
        } else {
            done();
        }
    });
});

function listenForNotifications(onMessage) {
    const serverlessOffline = 'ws://localhost:3001';
    const ws = new WebSocket(serverlessOffline);
    ws.on('message', onMessage);
    return ws;
}

async function uploadObjectToServerlessOffline(presignedInfo) {
    let formData = new FormData();
    Object.entries(presignedInfo.fields).forEach(function(entry) {
        const [field, value] = entry;
        formData.append(field, value);
    });
    formData.append('file', Buffer.from('hello, world!', 'utf8'));
    let formOptions = {
        headers: formData.getHeaders()
    };
    return await Axios.post(presignedInfo.url, formData, formOptions);
}