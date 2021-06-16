import {safeExecute} from "./utils";

class DriverGroup {
    private drivers: any[];

    constructor(drivers: any) {
        this.drivers = drivers.length ? drivers : [];

    }

    addDriver(driver: any) {
        this.drivers.push(driver);
    }

    /* Webdriver methods */
    get(url: any) {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => d.getPromise(url)
            ))
        );
    }

    getTitle(url: any) {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => d.getTitle()
            ))
        );
    }

    refresh(by: any) {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => d.navigate().refreshPromise()
            ))
        );
    }

    /* WebElement methods */
    clear(by: any) {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => this.findElement(d, by).clearPromise())
            )
        );
    }

    click(by: any) {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => this.findElement(d, by).clickPromise()
            ))
        );
    }

    getTextAll(by: any) {
        var self = this;
        return Promise.all(this.drivers.map(d => safeExecute(
            () => {
                var out = [], elements = self.findElements(d, by);
                for (var i = 0; i < elements.size(); i++) {
                    out.push(elements.get(i).getText())
                }
                return Promise.all(out);
            }))
        );
    }

    getText(by: any) {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => this.findElement(d, by).getTextPromise()
            ))
        );
    }

    sendKeys(by: any, text: any = "") {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => this.findElement(d, by).sendKeysPromise(text)
            ))
        );
    }

    getAttribute(by: any, attribute: any) {
        return Promise.all(
            this.drivers.map(d => safeExecute(
                () => this.findElement(d, by).getAttributePromise(attribute)
            ))
        );
    }

    findElement(driver: any, by: any) {
        return driver.findElement(by);
    }

     findElements(driver: any, by: any) {
        return driver.findElements(by);
    }

    executeScript(script: any) {
        return this.drivers.map(d => safeExecute(() => d.executeScriptPromise(script)));
    }

    executeAsyncScript(script: any) {
        return this.drivers.map(d => safeExecute(
            () => d.executeAsyncScriptPromise(script)
        ));
    }

    quit(script: any) {
        return this.drivers.map(d => safeExecute(
            () => d.quitPromise()
        ));
    }

}

export {
    DriverGroup
}