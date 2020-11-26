const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
try {
    //////////////////////////////////////////////
    // Be sure to edit env.yml
    // so these values aren't null/undefined
    //////////////////////////////////////////////
    const env = path.resolve(__dirname, '../../../env.yml');
    const doc = yaml.safeLoad(fs.readFileSync(env, 'utf8'));
    process.env.uploaddelim = doc.uploaddelim;
} catch (err) {
    console.log(err);
    process.exit(1);
}
const UPLOADDELIM = process.env.uploaddelim;
const request = require('../../../src/upload/request.js');
jest.mock('axios');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Upload Hook', async function(){
    //////////////////////////////////////////////
    // Mocks
    //////////////////////////////////////////////
    const mockuploads =  { 'b' : ['c', 'asdfsf'], 'C': ['sdjfsl'] };
    const mockevent = {
        'Records' : Object.keys(mockuploads).reduce( function(acc, uid) {
            for (const x of mockuploads[uid]) {
                acc.push({ 's3' : {'object' : {'key' : `upload/${uid}/${x}`}}});
            }
            return acc;
        }, [])
    };
    const mockcontext = {};
    const mockapigateway = `http://localhost:3001/@connections/`;
    axios.post.mockImplementation(function(url, data){ return data; });

    //////////////////////////////////////////////
    // Tests
    //////////////////////////////////////////////
    await request.handler(mockevent, mockcontext);
    Object.keys(mockuploads).map(function(uid){
        let mockuser = `${mockapigateway}${uid}`;
        let mocknotifs = {'statusCode' : 200, 'success' : mockuploads[uid]};
        expect(axios.post).toHaveBeenCalledWith(mockuser, mocknotifs);
    });
});
