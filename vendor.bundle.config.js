/*specify all the node module dependencies to be bundled up*/
module.exports = {
    bundle: {
        vendor: {
            scripts: [
                './bower_components/**/*.min.js'
            ]
        }
    }
};