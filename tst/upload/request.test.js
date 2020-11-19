const request = require('../../src/upload/request.js');
const operations = require('../../src/upload/operations.js');
jest.mock('../../src/upload/operations.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Upload handler', function(){
    let mockres = {'statusCode' : 200, 'body' : 'hello, world!'};
    operations.upload.mockResolvedValue(mockres.body);

    return request.handler({}, {}).then(function(res){
        expect(res).toHaveProperty('statusCode');
        expect(res.statusCode).toEqual(mockres.statusCode);
        expect(res).toHaveProperty('body');
        expect(JSON.parse(res.body)).toEqual(mockres.body);
    });
});
