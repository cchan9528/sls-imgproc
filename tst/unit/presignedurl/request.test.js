jest.mock('axios');
jest.mock('../../../src/presignedurl/operations.js');
const axios = require('axios');
const request = require('../../../src/presignedurl/request.js');
const operations = require('../../../src/presignedurl/operations.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('PresignedURL handler', async function(){
    let mockevent   = {'requestContext' : {'connectionId' : 1}};
    let mockcontext = {};
    let mockres     = {'statusCode' : 200, 'body' : 'http://s3.com/presignedurl'};
    const mockAPIGateway = `http://localhost:3001/@connections/`;

    operations.getPresignedS3Access.mockImplementation(async function(options){
        return mockres.body;
    });

    await request.handler(mockevent, mockcontext);
    expect(axios.post).toHaveBeenCalledWith(
        `${mockAPIGateway}${mockevent.requestContext.connectionId}`,
        mockres
    );
});
