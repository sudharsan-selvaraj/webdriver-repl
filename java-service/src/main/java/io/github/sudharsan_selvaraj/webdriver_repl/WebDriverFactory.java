package io.github.sudharsan_selvaraj.webdriver_repl;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariDriver;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Locale;

/**
 * WebDriverFactory class take cares of creating the required browser driver objects.
 */

public class WebDriverFactory {
    /**
     * Returns the respective WebDriver object based on the passed browser name.
     *
     * @param browserName  name of the browser.
     * @param capabilities selenium's DesiredCapabilities for the browser.
     * @return the WebDriver
     */
    public static WebDriver getWebDriver(String browserName, DesiredCapabilities capabilities) {
        switch (browserName.toLowerCase(Locale.ROOT)) {
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                return new FirefoxDriver(capabilities);
            case "safari":
                return new SafariDriver(capabilities);
            case "edge":
                WebDriverManager.edgedriver().setup();
                return new EdgeDriver(capabilities);
            default:
                WebDriverManager.chromedriver().setup();
                return new ChromeDriver(capabilities);
        }
    }

    /**
     * Returns the RemoteWebDriver object for the given selenium address.
     *
     * @param seleniumAddress URL where the selenium server is running.
     * @param capabilities    selenium's DesiredCapabilities for the browser.
     * @return the WebDriver
     */
    public static WebDriver getRemoteWebDriver(String seleniumAddress, DesiredCapabilities capabilities) throws MalformedURLException {
        return new RemoteWebDriver(new URL(seleniumAddress), capabilities);
    }

}
