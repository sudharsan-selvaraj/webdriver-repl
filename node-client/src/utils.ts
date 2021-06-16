let safeExecute = function (fn: () => any) {
    try {
        return fn();
    } catch (err) {
        if (err.cause) {
            return err.cause.getMessage();
        } else {
            return err.message
        }
    }
}

export {
    safeExecute
}