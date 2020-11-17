const request = require('../../src/upload/request.js');
const operations = require('../../src/upload/operations.js');
jest.mock('../../src/upload/operations.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Upload handler works', function(){
    let mockres = { 'statusCode' : 200 };
    operations.upload.mockResolvedValue(mockres);

    return request.handler({}, {}).then(function(res){
        expect(res).toEqual(mockres);
    });
});
