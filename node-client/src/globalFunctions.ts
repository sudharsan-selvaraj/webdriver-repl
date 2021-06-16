import {logger} from "./logger";
import {WebElementList} from "./WebElementList";
import {DriverGroup} from "./DriverGroup";
import {JavaPackages} from "./JavaPackages";
import {DriverProvider} from "./DriverProvider";

export class GlobalFunctions {
    private By: any;
    private Collectors: any;
    private driverProvide: DriverProvider;

    constructor(private driver: any, private java: any) {
        this.By = java.import(JavaPackages.By);
        this.Collectors = java.import(JavaPackages.Collectors);
        this.driverProvide = new DriverProvider(java);
    }

    /* driver methods */

    createDriver(browserName: string, capabilities: any = {}) {
        return this.driverProvide.createDriver(browserName, capabilities);
    }

    createRemoteDriver(remoteUrl: string, capabilities: any) {
        return this.driverProvide.createRemoteDriver(remoteUrl, capabilities);
    }

    createDriverGroup(...drivers: any[]) {
        return new DriverGroup(drivers);
    }

    /* FindElement methods */
    $id(locator: string) {
        return this.findElement(this.By.id(locator));
    }

    $name(locator: string) {
        return this.findElement(this.By.name_(locator));
    }

    $tagName(locator: string) {
        return this.findElement(this.By.tagName(locator));
    }

    $className(locator: string) {
        return this.findElement(this.By.className(locator));
    }

    $cssSelector(locator: string) {
        return this.findElement(this.By.cssSelector(locator));
    }

    $xpath(locator: string) {
        return this.findElement(this.By.xpath(locator));
    }

    $linkText(locator: string) {
        return this.findElement(this.By.linkText(locator));
    }

    $partialLinkText(locator: string) {
        return this.findElement(this.By.partialLinkText(locator));
    }

    /* Find Elements method */

    $$id(locator: string) {
        return this.findElements(this.By.id(locator));
    }

    $$name(locator: string) {
        return this.findElements(this.By.name_(locator));
    }

    $$tagName(locator: string) {
        return this.findElements(this.By.tagName(locator));
    }

    $$className(locator: string) {
        return this.findElements(this.By.className(locator));
    }

    $$cssSelector(locator: string) {
        return this.findElements(this.By.cssSelector(locator));
    }

    $$xpath(locator: string) {
        return this.findElements(this.By.xpath(locator));
    }

    $$linkText(locator: string) {
        return this.findElements(this.By.linkText(locator));
    }

    $$partialLinkText(locator: string) {
        return this.findElements(this.By.partialLinkText(locator));
    }

    /* Java function */

    Import(clsName: string) {
        let importedClass = this.java.import(clsName);
        (global as any)[clsName.split(".").pop()] = importedClass;
    }

    showErrors(value: boolean) {
        this.driverProvide.showErrors(value);
    }

    highlightElements(value: boolean) {
        this.driverProvide.highlightElements(value);
    }

    /* private methods */

    private findElement(by: any) {
        try {
            return this.driver.findElement(by);
        } catch (err) {
            logger.error(err.cause.getMessage())
        }
    }

    private findElements(by: any) {
        var elements = this.driver.findElements(by);
        logger.success(`Found ${elements.size()} matching nodes`)
        return new WebElementList(elements);
    }
}