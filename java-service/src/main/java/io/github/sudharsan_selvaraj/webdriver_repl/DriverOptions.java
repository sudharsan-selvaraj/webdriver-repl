package io.github.sudharsan_selvaraj.webdriver_repl;

import lombok.Getter;
import lombok.Setter;

/**
 * Class that hold the information for creating the webdriver object.
 */
@Getter
@Setter
public class DriverOptions {

    private String browserName;
    private String seleniumAddress;
    private String capabilities;

}
