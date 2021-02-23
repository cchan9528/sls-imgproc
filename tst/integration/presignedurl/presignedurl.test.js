const WebSocket = require('ws');

test('Get a presignedurl', function(done) {
    const serverlessOffline = 'ws://localhost:3001';
    const serverlessS3Local = 'http://localhost:4569/local-bucket';

    const ws = new WebSocket(serverlessOffline);
    ws.on('message', function(data) {
        try {
            data = JSON.parse(data);
            expect(data).toHaveProperty('statusCode', 200);
            expect(data).toHaveProperty('body');
            expect(data.body).toHaveProperty('url');
            expect(data.body.url).toEqual(serverlessS3Local);
            done();
        } catch (err) {
            done(err);
        }
    });
});