import * as NodeJava from "java";
import * as repl from "repl";
import {logger} from "./logger"
import {GlobalFunctions} from "./globalFunctions";
import {JavaPackages} from "./JavaPackages";
import * as vm from "vm";
import {DriverProvider} from "./DriverProvider";

let CLASSES_TO_BE_LOADED: string[] = [
    JavaPackages.WebDriverManager,
    JavaPackages.RemoteWebDriver,
    JavaPackages.ChromeDriver,
    JavaPackages.FirefoxDriver,
    JavaPackages.SafariDriver,
    JavaPackages.EdgeDriver,
    JavaPackages.FirefoxDriver,
    JavaPackages.InternetExplorerDriver,
    JavaPackages.Actions,
    JavaPackages.Select,
    JavaPackages.By
];

let functionToBeLoaded = [
    "$id", "$name", "$tagName", "$cssSelector", "$className", "$xpath", "$linkText", "$partialLinkText",
    "$$id", "$$name", "$$tagName", "$$cssSelector", "$$className", "$$xpath", "$$linkText", "$$partialLinkText",
    "createDriver", "createRemoteDriver", "createDriverGroup",
    "Import",
    "showErrors", "highlightElements"
];

let help = function () {
    console.log(`
Available methods:
Util:
1. Import - import any java package

WebDriver:
1. createDriver(browserName, CapabilitiesJSON) - to create new local webdriver
2. createRemoteDriver(seleniumAddress, CapabilitiesJSON) - to create new remote webdriver
3. createDriverGroup(...drivers) - create a driver group.

WebElement (add $$ to find multiple elements):
$id
$name
$tagName
$cssSelector
$className
$xpath
$linkText
$partialLinkText
    `);
}


function isRecoverableError(error: any) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}


class Runner {
    private globalFunction: GlobalFunctions;

    constructor(private driver: any, private java: NodeJava.NodeAPI) {
        this.globalFunction = new GlobalFunctions(driver, java);
    }

    async init() {
        this.registerGlobals();
        logger.debug("*************************************************************************\n");
        logger.debug("Session created successfully . Start using driver object to interact with the browser");
        logger.debug("Why not start with driver.get(\"example.com\")");
        logger.debug("Type help() to get all available methods\n");
        logger.debug("*************************************************************************");
    }

    private registerGlobals() {
        let _global: any = global;
        _global.java = this.java;
        _global.driver = this.driver;

        CLASSES_TO_BE_LOADED.forEach(pkg => this.globalFunction.Import(pkg));

        functionToBeLoaded.forEach(f => _global[f] = (this.globalFunction as any)[f].bind(this.globalFunction));
        _global.help = help;
    }


}

let run = async function (driver: any, java: NodeJava.NodeAPI) {

    let runner = new Runner(driver, java);
    let driverProvider = new DriverProvider(java);
    await runner.init();

    let replServer: repl.REPLServer = repl.start({
        prompt: "> ",
        terminal: true,
        useGlobal: true,
        ignoreUndefined: true,
        useColors: true,
        preview: true,
        eval: async (command, context, filename, callback) => {
            try {
                var result = await vm.runInNewContext(command, context);
                callback(null, result);
            } catch (err) {
                if (isRecoverableError(err)) {
                    callback(new repl.Recoverable(err), null);
                } else {
                    if(err.cause) {
                        callback(err.cause, null)
                    } else {
                        callback(err, null)
                    }
                }
            }
        }
    });

    replServer.on("exit", () => {
        driverProvider.destoryAll();
    });

}

export {
    run
}