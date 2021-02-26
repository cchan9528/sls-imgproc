const Axios = require('axios');
const FormData = require('form-data');
const WebSocket = require('ws');

test('Notify on S3 Upload', function(done) {
    let connectionId = null;
    let ws = getServerlessOfflineClient();
    ws.on('message', function(data) {
        const message = JSON.parse(data);
        if (!connectionId) {
            connectionId = message.body.fields.key.split('/')[1];
            console.log(message.body);
            uploadObjectToServerlessS3Local(message.body);
        } else {
            console.log(message);
            expect(message.statusCode).toEqual(200);
            expect(message.success).toEqual(true);
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