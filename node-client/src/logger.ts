var colors = require("colors");

class Logger {
    success(message: string) {
        this.log(colors.green, message);
    }

    debug(message: string) {
        this.log(colors.cyan, message);
    }

    error(message: string) {
        this.log(colors.red, message);
    }

    warning(message: string) {
        this.log(colors.yellow, message);
    }

    log(color: any, message: any) {
        console.log(color(message))
    }
}

export let logger = new Logger();