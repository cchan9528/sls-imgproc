const Axios = require('axios');
const FormData = require('form-data');
const WebSocket = require('ws');

test('Notify on S3 Upload', function(done) {
    let connected = false;
    let ws = getServerlessOfflineClient();
    ws.on('message', function(data) {
        const message = JSON.parse(data);
        if (!connected) {
            connected = true;
            uploadObjectToServerlessS3Local(message.body);
        } else {
            // Add expectations here
            done();
        }
    });
});

function getServerlessOfflineClient(onMessage) {
    const serverlessOffline = 'ws://localhost:3001';
    const ws = new WebSocket(serverlessOffline);
    return ws;
}

async function uploadObjectToServerlessS3Local(presignedInfo) {
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