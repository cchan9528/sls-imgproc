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

const fs = require('fs');
const path = require('path');
const S3Client = require('../../../../src/process/aws/S3Client.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
const s3Client = new S3Client();

test('S3Client class: download()', async function(){
    let mockws = '123123123';
    let mockuid = 'abc123abc';
    let mockimg = {'data': Buffer.from('lalala'), 'ContentEncoding': 'utf-8'};

    mockS3.promise.mockImplementation(function(){
        return mockimg;
    });

    let dst = await s3Client.download(mockws, mockuid);
    expect(dst).toContain(path.join(mockws, mockuid));
    expect(fs.writeFile).toBeCalledWith(dst, mockimg.data, mockimg.ContentEncoding);
});

test('S3Client class: upload()', async function(){
    await s3client.upload()
});
