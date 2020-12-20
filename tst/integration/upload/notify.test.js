jest.mock('axios');
const mockS3 = {
    putObject : jest.fn().mockReturnThis(),
    promise : jest.fn()
};
jest.mock('aws-sdk', function(){
    return {
        'S3' : jest.fn(function(){ return mockS3 }),
        'Endpoint' : jest.fn()
    }
});

const axios = require('axios');
const operations = require('./../../../src/notify/event.js');

test.skip('Notify S3 Upload', async function(){
    const options = {};

    //////////////////////////////////////////////////
    // Drive Test
    //////////////////////////////////////////////////
    await operations.upload(options); // Mock S3 Upload

    //////////////////////////////////////////////////
    // Evaluate Test
    //////////////////////////////////////////////////
    expect(mockS3.putObject).toHaveBeenCalled(); // S3 Upload


    // TODO: how do we mock a S3 event for a unit test?
    // jest doesn't hook up handler (serverless does)
    expect(axios.post).toHaveBeenCalled(); // WebSocket notification
});
