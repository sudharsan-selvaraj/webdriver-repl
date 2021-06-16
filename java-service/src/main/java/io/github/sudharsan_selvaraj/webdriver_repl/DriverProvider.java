package io.github.sudharsan_selvaraj.webdriver_repl;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.sudharsan_selvaraj.SpyDriver;
import io.github.sudharsan_selvaraj.SpyDriverListener;
import io.github.sudharsan_selvaraj.webdriver_repl.services.ElementHighlighterService;
import io.github.sudharsan_selvaraj.webdriver_repl.services.ErrorNotificationService;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;

/**
 * DriverProvider manages the creation of WebDriver objects and initializing it with required plugins(service).
 * <p>
 * Repl client will make use of this class to create the necessary webdriver's
 */
public class DriverProvider {

    private static DriverProvider _instance;
    Map<String, Map<String, SpyDriverListener>> eventListenerMap;

    private DriverProvider() {
        eventListenerMap = new HashMap<>();
        /* Disable chromedriver and selenium logs in console */
        System.setProperty("webdriver.chrome.silentOutput", "true");
        java.util.logging.Logger.getLogger("org.openqa.selenium").setLevel(Level.OFF);
        java.util.logging.Logger.getLogger("io.github.bonigarcia").setLevel(Level.OFF);
    }

    public static DriverProvider getInstance() {
        if (_instance == null) {
            _instance = new DriverProvider();
        }
        return _instance;
    }

    /**
     * Creates new WebDriver object for the given DriverOptions
     *
     * @param options
     * @return WebDriver Object
     */
    public WebDriver getDriver(DriverOptions options) throws IOException {
        WebDriver driver;
        DesiredCapabilities capabilities = getCapabilities(new ObjectMapper().readValue(options.getCapabilities(), Map.class));
        if (options.getSeleniumAddress() != null) {
            driver = WebDriverFactory.getRemoteWebDriver(options.getSeleniumAddress(), capabilities);
        } else {
            driver = WebDriverFactory.getWebDriver(options.getBrowserName(), capabilities);
        }
        return getSpyDriver(driver).getSpyDriver();
    }

    /**
     * Method responsible for creating the spydriver for the given webdriver and register the required services.
     *
     * @param driver Webdriver object
     * @return SpyDriver object
     */

    private SpyDriver<WebDriver> getSpyDriver(WebDriver driver) {
        String sessionId = ((RemoteWebDriver) driver).getSessionId().toString();
        Map<String, SpyDriverListener> services = getServices(driver);
        eventListenerMap.put(sessionId, services);
        SpyDriver<WebDriver> spyDriver = new SpyDriver<>(driver);
        services.values().forEach(spyDriver::addListener);
        return spyDriver;
    }

    /**
     * This method converts the capabilities that is passed in as Map to DesiredCapabilities object
     *
     * @param capabilityMap Map that holds the desiredcapabilities
     * @return DesiredCapabilities object
     */
    private DesiredCapabilities getCapabilities(Map<String, Object> capabilityMap) {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilityMap
                .entrySet()
                .forEach(entry -> {
                    capabilities.setCapability(entry.getKey(), entry.getValue());
                });

        return capabilities;
    }

    /**
     * returns the list of services that are to be registered in SpyDriver listeners
     *
     * @return Map of SpyDriverListener
     */
    private Map<String, SpyDriverListener> getServices(WebDriver driver) {
        return new HashMap<String, SpyDriverListener>() {{
            put("highlighter", new ElementHighlighterService(driver));
            put("errorNotifier", new ErrorNotificationService());
        }};
    }

    private String getDriverSessionId(WebDriver driver) {
        return ((RemoteWebDriver) driver).getSessionId().toString();
    }

    /**
     * Return's the respective service that is register for a specific webdriver instance.
     *
     * @param driver      WebDriver object for which the service need to be fetched
     * @param serviceName Name of the service
     * @return SpyDriverListener
     */
    public Object getService(WebDriver driver, String serviceName) {
        String sessionId = getDriverSessionId(driver);
        if (eventListenerMap.containsKey(sessionId)) {
            return eventListenerMap.get(sessionId).get(serviceName);
        } else {
            return null;
        }
    }
}
