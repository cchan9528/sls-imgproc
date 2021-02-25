// On disconnect, the S3 objects stored
// under the websocket id should be REMOVED
async function handler(event, context) {
    console.log("disconnected");
}

module.exports = {
    handler
};