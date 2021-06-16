import {JavaPackages} from "./JavaPackages";

let _global = global as any;
_global._drivers = [];

class DriverProvider {

    private DriverProvider: any;
    private DriverOptions: any;

    constructor(private java: any) {
        this.DriverProvider = java.import(JavaPackages.DriverProvider);
        this.DriverOptions = java.import(JavaPackages.DriverOptions);
    }

    createDriver(browserName: string, capabilities: any = {}) {
        var driverOptions = new this.DriverOptions();
        driverOptions.setBrowserName(browserName);
        driverOptions.setCapabilities(JSON.stringify(capabilities));
        return this.getDriver(driverOptions);
    }

    createRemoteDriver(remoteUrl: string, capabilities: any) {
        var driverOptions = new this.DriverOptions();
        driverOptions.setSeleniumAddress(remoteUrl);
        driverOptions.setCapabilities(JSON.stringify(capabilities || "{}"));
        return this.getDriver(driverOptions);
    }

    getDriver(driverOptions: any) {
        let driver = this.DriverProvider.getInstance().getDriver(driverOptions);
        _global._drivers.push(driver)
        return driver;
    }

    destoryAll() {
        _global._drivers.forEach((d: any) => d.quit());
    }

    highlightElements(value: boolean) {
        let self = this;
        _global._drivers.forEach((d: any) => {
            var highLightService = self.DriverProvider.getInstance().getService(d, "highlighter");
            if (value == true) {
                highLightService.resume();
            } else {
                highLightService.pause();
            }
        })
    }

    showErrors(value: boolean) {
        let self = this;
        _global._drivers.forEach((d: any) => {
            var errorNotifierService = self.DriverProvider.getInstance().getService(d, "errorNotifier");
            if (value == true) {
                errorNotifierService.resume();
            } else {
                errorNotifierService.pause();
            }
        })
    }
}

export {
    DriverProvider
}