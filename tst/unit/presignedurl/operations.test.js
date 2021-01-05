const operations = require('../../../src/presignedurl/operations.js');

//////////////////////////////////////////////
// mockReturnThis() is essential for chaining
// It returns 'this', which, in this case,
// is the mock itself; thereafter, more
// top-level mock functions can be called
//////////////////////////////////////////////
const mockS3 = { createPresignedPost : jest.fn() };
jest.mock('aws-sdk', function(){
    return {
        'S3' : jest.fn(function(){ return mockS3; }),
        'Endpoint' : jest.fn()
    }
});

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Basic get S3 Signed URL', async function() {
    let mockreq = {'uid' : 1};
    let mockerr = null;
    let mockpresignedurl = 'http://helloworld.com/presignedurl';

    // To pass info to a callback, mimic the
    // signature of the caller
    mockS3.createPresignedPost.mockImplementation(function(options, cb){
        // Can add dummy logic/implementation but for now....
        //
        // ...simply call cb with the mock err and presignedurl
        // ("Short-circuit"). cb *should not* be modified/mocked since we don't
        // want to test implementation - only behavior. In this case, as of
        // 1/4/2021 cb is the wrapper to simply resolve/reject the promise
        cb(mockerr, mockpresignedurl);
    });

    let res = await operations.getPresignedUrl(mockreq);
    expect(res).toBe(mockpresignedurl);
});
