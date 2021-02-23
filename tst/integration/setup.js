const ChildProcess = require('child_process');
const Path = require('path');
const WebSocket = require('ws');

async function spawnProcess(command, options) {
    const WAITSTART = 3000;
    return new Promise(function(resolve, reject) {
        let [cmd, ...args] = command.split(' ');
        let process = ChildProcess.spawn(cmd, args, options);
        process.on('error', function(err) {
            reject(err);
        });
        process.stdout.on('data', function(data) {
            setTimeout(function() {
                resolve(process);
            }, WAITSTART);
        });
    });
};

async function main() {
    let projectRoot = Path.normalize(Path.join(__dirname, '../../'));
    const COMMAND = 'serverless offline';
    const OPTIONS = {
        'shell': true,
        'cwd': projectRoot
    };
    global.__serverlessOffline = await spawnProcess(COMMAND, OPTIONS);
    console.log(`\n\nStarted serverless offline with PID ${global.__serverlessOffline.pid}...\n\n`);
}

module.exports = main;