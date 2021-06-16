export enum Browsers {
    chrome = "chrome",
    firefox = "firefox",
    edge = "edge",
    safari = "safari"
}

export interface CLIOptions {
    browser?: Browsers;
    seleniumAddress?: string;
    classpath?: string[];
    capabilities?: any;
    baseUrl?: any;
}