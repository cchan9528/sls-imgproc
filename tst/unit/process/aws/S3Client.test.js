//////////////////////////////////////////////
// mockReturnThis() is essential for chaining
// It returns 'this', which, in this case,
// is the mock itself; thereafter, more
// top-level mock functions can be called
//
// This mock in particular doesn't need to be
// at top of file because it is not
// needed/created until runtime.
//////////////////////////////////////////////
const mockS3 = {
    putObject : jest.fn().mockReturnThis(),
    getObject : jest.fn().mockReturnThis(),
    promise : jest.fn()
};
jest.mock('aws-sdk', function(){
    return {
        'S3' : jest.fn(function(){ return mockS3; }),
        'Endpoint' : jest.fn()
    }
});
jest.mock('fs');

const S3Client = require('../../../src/process/aws/S3Client.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
const s3Client = new S3Client();

test.skip('S3Client class: download()', async function(){
});

test.skip('S3Client class: upload()', async function(){
});
