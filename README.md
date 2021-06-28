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

or if you wanna debug a remote browser

```shell
wd-repl --seleniumAddress http://localhost:4444/wd/hub
```

<p align="center">
    <img src="./docs/wd-repl-demo.gif">
</p>

# Options:

type `wd-repl --help` to get the available CLI parameters

<p align="center">
    <img src="./docs/help.png">
</p>

## --browser

Supported browsers are `chrome`, `firefox`, `edge`, `safari`

## --seleniumAddress

URL where the selenium server is running

## --capabilities

The capability that is used to initialize the browser

For example, if we wanna launch the chrome browser in headless mode

```shell
wd-repl --browser chrome --capabilities "{ 'goog:chromeOptions': { 'agrs': ['--headless'] } }"
```

## --classpath

To load 3rd party jar files and that can be used in the REPL session

```shell
wd-repl --browser chrome --classpath \
  ~/.m2/repository/io/github/sudharsan-selvaraj/wow-xhr/1.0.1/wow-xhr-1.0.1.jar \
  ~/.m2/repository/io/github/sudharsan-selvaraj/selenium-auto-wait/1.0.1/selenium-auto-wait-1.0.1.jar 
```

And the jarfiles can be imported as

```shell
> Import("io.github.sudharsan_selvaraj.WowXhr");
```