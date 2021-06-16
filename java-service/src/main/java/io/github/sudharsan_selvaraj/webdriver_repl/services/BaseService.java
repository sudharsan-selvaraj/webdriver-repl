package io.github.sudharsan_selvaraj.webdriver_repl.services;

import io.github.sudharsan_selvaraj.types.BaseCommand;

public class BaseService {

    protected Boolean isFindElementCalled(BaseCommand command) {
        return command.getMethod().getName().startsWith("findElement");
    }

}
