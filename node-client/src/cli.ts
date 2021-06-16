import * as yargs from "yargs";
import * as launcher from "./launcher";

let supportedBrowsers = ["chrome", "firefox", "safari", "edge"];

let supportedArgs = [
    "browser",
    "capabilities",
    "seleniumAddress",
    "baseUrl"
];

let yargsOptions: any = {
    describes: {
        help: 'Print help menu',
        browser: `Browsername, e.g. ${supportedBrowsers.join("/")}`,
        capabilities: `Selenium capability for the webdriver`,
        seleniumAddress: `A running selenium address to use`,
        classpath: "array of path/class files that needs to be included in classpath"
    }
};

for (let key of Object.keys(yargsOptions.describes)) {
    yargs.describe(key, yargsOptions.describes[key]);
}

yargs.check(function (arg: any) {
    if (arg.browser && !supportedBrowsers.includes(arg.browser)) {
        throw new Error(`Error: Unsupported browser ${arg.browser}. Supported browsers are: ${supportedBrowsers}`);
    }
    return true;
});


let argv: any = yargs.parse(process.argv.splice(2));

// Check to see if additional flags were used.
argv.unknownFlags_ = Object.keys(argv).filter((element: string) => {
    return element !== '$0' && element !== '_' && supportedArgs.indexOf(element) === -1;
});

if (argv.seleniumAddress && !argv.capabilities) {
    argv.capabilities = JSON.stringify({browserName: "chrome"})
}

if (!argv.browser) {
    argv.browser = "chrome";
}

if (!argv.capabilities) {
    argv.capabilities = {};
} else {
    argv.capabilities = JSON.parse(argv.capabilities);
}

if (argv.classpath) {
    try {
        argv.capabilities = JSON.parse(argv.classpath);
    } catch (e) {
        argv.classpath = [argv.classpath]
    }
}

if (argv.help) {
    yargs.showHelp();
    process.exit(0);
}

launcher.launch(argv);