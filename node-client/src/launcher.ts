import {CLIOptions} from "./options";
import {JavaSession} from "./JavaSession";
import {run} from "./runner";
import {logger} from "./logger";
import {DriverProvider} from "./DriverProvider";
import {safeExecute} from "./utils";

let launch = async function (options: CLIOptions) {

    logger.debug("Creating Webdriver REPL session..")

    let javaInstance = await new JavaSession(options.classpath).init();
    let driverProvider = new DriverProvider(javaInstance);
    let driver = await getWebDriver(driverProvider, options);

    if(options.baseUrl) {
        safeExecute(() => driver.get(options.baseUrl));
        logger.success(`Navigated to ${options.baseUrl}`)
    }
    run(driver, javaInstance);
}

let getWebDriver = async function (driverProvider: DriverProvider, cliOptions: CLIOptions) {

    try {
        if (cliOptions.seleniumAddress) {
            return driverProvider.createRemoteDriver(cliOptions.seleniumAddress, cliOptions.capabilities);
        } else {
            return driverProvider.createDriver(cliOptions.browser, cliOptions.capabilities);
        }
    } catch (err) {
        logger.error(err);
    }

}

export {
    launch
}