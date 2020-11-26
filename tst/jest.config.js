const tstdir = "<rootDir>"; // Jest special token

module.exports = {
    'verbose': true,
    'testPathIgnorePatterns' : [
        `${tstdir}/integration`
    ]
}
