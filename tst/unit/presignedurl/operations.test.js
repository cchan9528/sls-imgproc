const operations = require('../../../src/presignedurl/operations.js');

//////////////////////////////////////////////
// mockReturnThis() is essential for chaining
// It returns 'this', which, in this case,
// is the mock itself; thereafter, more
// top-level mock functions can be called
//////////////////////////////////////////////
const mockS3 = { getSignedURL : jest.fn() };
jest.mock('aws-sdk', function(){
    return {
        'S3' : jest.fn(function(){ return mockS3; }),
        'Endpoint' : jest.fn()
    }
});

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Basic get S3 Signed URL', function(done) {
    let mockreq = {'uid' : 1};
    let mockerr = null;
    let mockpresignedurl = 'http://helloworld.com/presignedurl';

    // To pass info to a callback, mimic the
    // signature of the caller
    mockS3.getSignedURL.mockImplementation(function(op, options, cb){
        expect(op).toEqual('putObject');
        expect(options['Key']).toEqual(`upload/${mockreq.uid}`);
        cb(mockerr, mockpresignedurl);
    });

    function mockcb(err, mockpresignedurl) {
        if (err) {
            done(err); // Fail this specific test if err
        } else {
            expect(mockpresignedurl).toBe(mockpresignedurl);
            done();
        }
    }

    operations.getSignedURL(mockreq, mockcb);
});
