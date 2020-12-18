const childProcess = require('child_process');
const operations = require('./../../../src/upload/operations.js');

//////////////////////////////////////////////
// Mocks
//////////////////////////////////////////////
jest.mock('child_process');
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

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Process Image', async function(){
    let options = {'imgS3Path' : 'inputs/123'};

    await processImage(options);

    expect(mockS3.getObject).toHaveBeenCalled();
    expect(childProcess.execFile).toHaveBeenCalled();
    expect(mockS3.putObject).toHaveBeenCalled();
});
