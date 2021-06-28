import * as util from "util";
import * as java from "java";
import * as path from "path";

const mvnPromisify = util.promisify(require("node-java-maven"));

let EXCLUDED_JARS = [
    "byte-buddy-1.8.15.jar"
];

let isJarExcluded = function (jarPath: string) {
    var jar = path.basename(jarPath);
    return EXCLUDED_JARS.includes(jar);
}

export class JavaSession {

    constructor(private _classpath: string[] = []) {
    }

    async init(): Promise<java.NodeAPI> {
        let {classpath} = await mvnPromisify({packageJsonPath: path.resolve(path.resolve(__dirname), "../package.json")});
        [].concat(classpath, this._classpath).forEach(d => {
            if (!isJarExcluded(d)) {
                java.classpath.push(d)
            }
        });

        // @ts-ignore
        java.asyncOptions = {
            syncSuffix: "",
            promiseSuffix: "Promise",
            promisify: require('util').promisify
        }
        return java;
    }

}