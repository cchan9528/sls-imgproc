const operations = require('../../../src/upload/operations.js');

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
    promise : jest.fn()
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
test('Basic Local S3 Uploading', function(){
    let mockres = {'s':312123123};
    mockS3.promise.mockResolvedValue(mockres);

    return operations.upload({}).then(function(res){
        expect(res).toEqual(mockres);
        expect(mockS3.putObject).toHaveBeenCalled();
    });
});
