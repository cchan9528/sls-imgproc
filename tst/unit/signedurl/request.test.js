jest.mock('axios');
jest.mock('../../../src/signedurl/operations.js');
const axios = require('axios');
const request = require('../../../src/signedurl/request.js');
const operations = require('../../../src/signedurl/operations.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('SignedURL handler', async function(){
    let mockevent   = {'requestContext' : {'connectionId' : 1}};
    let mockcontext = {};
    let mockres     = {'statusCode' : 200, 'body' : 'http://s3.com/signedurl'};
    const mockAPIGateway = `http://localhost:3001/@connections/`;

    operations.getSignedURL.mockImplementation(async function(options, cb){
        // Mock the implmentation to just return values
        // to pass to the callback
        const mockerr = null;
        const mocksignedurl = mockres.body;

        // (Effectively) Merge the logic of cb with the mock implementation
        // so that we can test the callback logic as well
        await cb(mockerr, mocksignedurl);
    })

    await request.handler(mockevent, mockcontext);
    expect(axios.post).toHaveBeenCalledWith(
        `${mockAPIGateway}${mockevent.requestContext.connectionId}`,
        mockres
    );
});
