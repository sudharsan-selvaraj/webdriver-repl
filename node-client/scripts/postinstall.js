const path = require("path");
const utils = require("util");
const mvn = utils.promisify(require("node-java-maven"));

console.log("Loading required jar files..")
mvn({
    packageJsonPath: path.join(require.main.path, "../package.json"),
    debug: true
})