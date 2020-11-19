const request = require('../../src/signedurl/request.js');
const operations = require('../../src/signedurl/operations.js');
jest.mock('../../src/signedurl/operations.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('SignedURL handler', function(){
    let mockres = {'statusCode' : 200, 'body' : 'hello, world!'};
    operations.getSignedURL.mockResolvedValue(mockres.body);

    return request.handler({}, {}).then(function(res){
        expect(res).toHaveProperty('statusCode');
        expect(res.statusCode).toEqual(mockres.statusCode);
        expect(res).toHaveProperty('body');
        expect(JSON.parse(res.body)).toEqual(mockres.body);
    });
});
