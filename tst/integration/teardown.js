const Constants = require('constants');

async function stopProcess(process) {
    const INTERRUPT = 'SIGINT';

    return new Promise(function(resolve, reject) {
        console.log(`\n\nKilling process with PID ${process.pid}...`);
        process.kill(INTERRUPT);
        console.log(`...done.\n\n`);
    });
}

async function main() {
    let serverlessOffline = global.__serverlessOffline;
    serverlessOffline.on('exit', function(code, signal) {
        console.log(
            `serverlessOffline exited ${(code || signal!='SIGINT') ? 'badly' : 'safely'}`);
    });
    await stopProcess(serverlessOffline);
}

module.exports = main;