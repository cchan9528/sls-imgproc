const operations = require('../../src/signedurl/operations.js');

//////////////////////////////////////////////
// mockReturnThis() is essential for chaining
// It returns 'this', which, in this case,
// is the mock itself; thereafter, more
// top-level mock functions can be called
//////////////////////////////////////////////
const mockS3 = {
    getSignedURL : jest.fn()
};
jest.mock('aws-sdk', function(){
    return {
        'S3' : jest.fn(function(){ return mockS3; }),
        'Endpoint' : jest.fn()
    }
});

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Basic get S3 Signed URL', function(){
    let mockres = 'http://helloworld.com/signedurl';
    mockS3.getSignedURL.mockResolvedValue(mockres);

    return operations.getSignedURL({}).then(function(res){
        expect(res).toEqual(mockres);
        expect(mockS3.getSignedURL).toHaveBeenCalled();
    });
});
