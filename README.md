# webdriver-repl

`REPL` interface to learn and debug the selenium webdriver API from terminal

# Prerequisite

Requires JDK > 8 to be installed.

# Installation

```shell
npm install -g webdriver-repl
```

🚨 NOTE: This library uses [node-gyp](https://www.npmjs.com/package/node-gyp) to compile java code. So if you face any
error during installation, check the `node-gpy` installation page to install the dependency based on the operating
system.

# Usage

```shell
wd-repl --browser chrome
```

<p align="center">
    <img src="./docs/wd-repl-demo.gif">
</p>