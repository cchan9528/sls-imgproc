const Constants = require('constants');

function stopServerlessOffline(slsOffline) {
    slsOffline.stdin.write('q\n');
    slsOffline.stdin.pause();
    slsOffline.kill();
    console.log(`Killed ${globalConfig.processes[Constants.SLSOFFLINE]}`);
};

async function main(globalConfig) {
    stopServerlessOffline(globalConfig.processes[Constants.SLSOFFLINE]);
}

function stopProcess(proc) {
    proc.stdin.write('q\n');
    proc.stdin.pause();
    proc.kill();
}

// module.exports = main;

module.exports = async function() {
    console.log("goodbye, world!");
}
