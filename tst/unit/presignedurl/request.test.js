jest.mock('axios');
jest.mock('../../../src/presignedurl/operations.js');
const axios = require('axios');
const request = require('../../../src/presignedurl/request.js');
const operations = require('../../../src/presignedurl/operations.js');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('SignedURL handler', async function(){
    let mockevent   = {'requestContext' : {'connectionId' : 1}};
    let mockcontext = {};
    let mockres     = {'statusCode' : 200, 'body' : 'http://s3.com/presignedurl'};
    const mockAPIGateway = `http://localhost:3001/@connections/`;

    operations.getSignedURL.mockImplementation(async function(options, cb){
        // Mock the implmentation to just return values
        // to pass to the callback
        const mockerr = null;
        const mockpresignedurl = mockres.body;

        // (Effectively) Merge the logic of cb with the mock implementation
        // so that we can test the callback logic as well
        await cb(mockerr, mockpresignedurl);
    })

    await request.handler(mockevent, mockcontext);
    expect(axios.post).toHaveBeenCalledWith(
        `${mockAPIGateway}${mockevent.requestContext.connectionId}`,
        mockres
    );
});
