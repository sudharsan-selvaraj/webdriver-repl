package io.github.sudharsan_selvaraj.webdriver_repl.services;

import io.github.sudharsan_selvaraj.SpyDriverListener;
import io.github.sudharsan_selvaraj.types.driver.DriverCommandException;
import io.github.sudharsan_selvaraj.types.driver.DriverCommandResult;
import io.github.sudharsan_selvaraj.types.element.ElementCommandException;
import io.github.sudharsan_selvaraj.types.element.ElementCommandResult;
import io.github.sudharsan_selvaraj.webdriver_repl.ScriptProvider;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

/**
 * ErrorNotificationService class is responsible for displaying an error banner in the browser when any error occured
 * while executing webdriver or webelement command.
 */
@Getter
@Setter
public class ErrorNotificationService extends BaseService implements SpyDriverListener {

    private Boolean showErrors = true;

    public void pause() {
        this.showErrors = false;
    }

    public void resume() {
        this.showErrors = true;
    }

    public void afterDriverCommandExecuted(DriverCommandResult command) {
        if(command.getMethod().getName().matches("close|quit")) {
            return;
        }
        checkAndInjectError(command.getDriver());
    }

    public void afterElementCommandExecuted(ElementCommandResult command) {
        checkAndInjectError(command.getDriver());
    }

    public void onException(DriverCommandException command) {
        checkAndInjectError(command.getDriver());
        injectError(command.getDriver(), command.getException());
    }

    public void onException(ElementCommandException command) {
        checkAndInjectError(command.getDriver());
        injectError(command.getDriver(), command.getException());
    }

    private void injectError(WebDriver driver, Throwable e) {
        if (showErrors) {
            JavascriptExecutor js = ((JavascriptExecutor) driver);
            if (e != null) {
                js.executeScript(ScriptProvider.getFunction("showErrorBanner"), e.getMessage());
            }
        }
    }

    private void checkAndInjectError(WebDriver driver) {
        JavascriptExecutor js = ((JavascriptExecutor) driver);
        Boolean isScriptAlreadyInjected = (Boolean) js.executeScript("return !!window.wd_repl_error_notifier");
        if (!isScriptAlreadyInjected) {
            js.executeScript("window.wd_repl_error_notifier = { show : true };" + ScriptProvider.getFunction("injectErrorAssets"));
        }
    }

}
