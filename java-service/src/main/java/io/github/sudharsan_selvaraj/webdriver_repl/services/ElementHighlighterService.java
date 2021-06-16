package io.github.sudharsan_selvaraj.webdriver_repl.services;

import io.github.sudharsan_selvaraj.SpyDriverListener;
import io.github.sudharsan_selvaraj.types.BaseCommand;
import io.github.sudharsan_selvaraj.types.driver.DriverCommandException;
import io.github.sudharsan_selvaraj.types.driver.DriverCommandResult;
import io.github.sudharsan_selvaraj.types.element.ElementCommandException;
import io.github.sudharsan_selvaraj.types.element.ElementCommandResult;
import io.github.sudharsan_selvaraj.webdriver_repl.ScriptProvider;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * ElementHighlighterService class is responsible for highlighting the webelements in browser when findElement method is called.
 */
@Getter
@Setter
public class ElementHighlighterService extends BaseService implements SpyDriverListener {

    private Boolean highlightElement = true;
    private WebDriver driver;

    public ElementHighlighterService(WebDriver driver) {
        this.driver = driver;
    }

    public void pause() {
        highlightElement(driver, Collections.emptyList());
        this.highlightElement = false;
    }

    public void resume() {
        this.highlightElement = true;
    }

    public void afterDriverCommandExecuted(DriverCommandResult command) {
        if (command.getMethod().getName().matches("close|quit")) {
            return;
        }
        checkAndInjectCss(command.getDriver());
        if (isFindElementCalled(command)) {
            processFindElementCommand(command.getDriver(), command, command.getResult());
        }
    }

    public void afterElementCommandExecuted(ElementCommandResult command) {
        checkAndInjectCss(command.getDriver());
        if (isFindElementCalled(command)) {
            processFindElementCommand(command.getDriver(), command, command.getResult());
        }
    }

    public void onException(DriverCommandException command) {
        checkAndInjectCss(command.getDriver());
    }

    public void onException(ElementCommandException command) {
        checkAndInjectCss(command.getDriver());
    }

    private void processFindElementCommand(WebDriver driver, BaseCommand command, Object result) {
        List<WebElement> elements = new ArrayList<>();

        if (command.getMethod().getName().startsWith("findElements")) {
            elements = (List<WebElement>) result;
        } else {
            elements.add((WebElement) result);
        }

        highlightElement(driver, elements);
    }

    /**
     * Highlights the passed element in the browser.
     *
     * @param driver   WebDriver obeject that is used to execute the javascript
     * @param elements List of elements that needs to be highlighted
     */
    private void highlightElement(WebDriver driver, List<WebElement> elements) {
        if (highlightElement) {
            JavascriptExecutor js = ((JavascriptExecutor) driver);
            js.executeScript(ScriptProvider.getFunction("highlighter"), elements);
        }
    }

    /**
     * This method will inject the style tag to the DOM with the css required for highlighting the element.
     *
     * @param driver
     */
    private void checkAndInjectCss(WebDriver driver) {
        JavascriptExecutor js = ((JavascriptExecutor) driver);
        Boolean isScriptAlreadyInjected = (Boolean) js.executeScript("return !!window.wd_repl_highlighter");
        if (!isScriptAlreadyInjected) {
            js.executeScript("window.wd_repl_highlighter = {};" + ScriptProvider.getFunction("injectCss"));
        }
    }

}
