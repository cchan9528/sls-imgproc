const upload = require('../../src/upload/handler.js').upload;
// const AWS = require('aws-sdk');

// jest.mock('aws-sdk');

test('Basic Local S3 Uploading Works', function(){
    let res = upload({});
    expect(res).toHaveProperty('statusCode', 200);
});
