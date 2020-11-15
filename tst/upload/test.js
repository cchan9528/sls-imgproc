const rewire = require('rewire');
const upload = rewire('../../src/upload/index.js');

///////////////////////////////////
// Access private functions
///////////////////////////////////
const _upload = upload.__get__('upload');

///////////////////////////////////
// Tests
///////////////////////////////////
test('Basic Local S3 Uploading Works', function(){
    return _upload({}).then(function(res){
        expect(res).toHaveProperty('statusCode', 200);
    });
});

test('Upload handler works', function(){
    let mockdata = { 'statusCode' : 200 };
    upload.__set__('upload', function(){ return mockdata });

    return upload.handler({}, {}).then(function(res){
        expect(res).toHaveProperty('statusCode', 200);
    });
})
