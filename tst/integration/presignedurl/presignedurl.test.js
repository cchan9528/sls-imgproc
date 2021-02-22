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
    /*
     *  Control our return value for testing purposes
     */
    const mockerr = null;
    const mockpresignedurl = 'helloworld!';
    mockS3.createPresignedPost.mockImplementation(function(options, cb){
         cb(mockerr, mockpresignedurl);
    });


    /*
     *  Execute the test
     */
     // console.log('CREATED SOCKET');
    const ws = new WebSocket(ENDPOINT);
    ws.on('open', function(){
        console.log("connected!");
        done();
    });
    // ws.on('message', function(data) {
    //     try{
    //         // console.log(data);
    //         expect(data).toEqual({ 'statusCode' : 200, 'body' : mockpresignedurl });
    //         done();
    //     } catch (err) {
    //         done(err);
    //     }
    // });
    // console.log(ws);
    // console.log('ended test');
});
