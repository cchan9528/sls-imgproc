const mockS3 = { createPresignedPost : jest.fn() };
jest.mock('aws-sdk', function(){
    return {
        'S3' : jest.fn(function(){ return mockS3; }),
        'Endpoint' : jest.fn()
    }
});
const WebSocket = require('ws');
const ENDPOINT = 'ws://localhost:3001';

test('Get a presignedurl', function(done){
    const mockerr = null;
    const mockpresignedurl = 'helloworld!';
    mockS3.createPresignedPost.mockImplementation(function(options, cb){
         cb(mockerr, mockpresignedurl);
    });

    const ws = new WebSocket(ENDPOINT);
    ws.on('message', function(data) {
        try{
            expect(data).toEqual({ 'statusCode' : 200, 'body' : mockpresignedurl });
            done();
        } catch (err) {
            done(err);
        }
    });
});
