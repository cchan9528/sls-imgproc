const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
try {
    const env = yaml.load(
        fs.readFileSync(
            path.resolve(__dirname, '../../../env.yml'),
            'utf8'
        )
    );
    process.env.uploaddelim = env.uploaddelim;
} catch (err) {
    console.log(err);
    console.log('\n\nThis test relies on a valid env.yml at project root\.',
                'Ensure that this file is valid.\n\n');
    process.exit(1);
}
const UPLOADDELIM = process.env.uploaddelim;
const request = require('../../../src/notify/event.js');
jest.mock('axios');

//////////////////////////////////////////////
// Tests
//////////////////////////////////////////////
test('Notify Hook', async function(){
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
    // Run
    //////////////////////////////////////////////
    await request.handler(mockevent, mockcontext);
    Object.keys(mockuploads).map(function(uid){
        let mockuser = `${mockapigateway}${uid}`;
        let mocknotifs = {'statusCode' : 200, 'success' : mockuploads[uid]};
        expect(axios.post).toHaveBeenCalledWith(mockuser, mocknotifs);
    });
});
