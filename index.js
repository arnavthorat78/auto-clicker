// Import all required modules
const robot = require("robotjs");
const { GlobalKeyboardListener } = require("node-global-key-listener");
const chalk = require("chalk");

const config = require("./config.json");

console.log(`
${chalk.green.bold.underline("Autoclicker")}
${chalk.grey("Made by Arnav Thorat!")}

Edit the configuration for the autoclicker in ${chalk.bold(
  "config.json"
)}. Refer to the README for information.

${chalk.underline("Current configuration:")}
Start key:                           ${chalk.bold(config.startKey.toUpperCase())}
Stop key:                            ${chalk.bold(config.stopKey.toUpperCase())}
Pause key:                           ${chalk.bold(config.pauseKey.toUpperCase())}

Milliseconds between clicks:         ${chalk.bold(config.millisecondsBetweenEachClick)}
`);

// (refer to node-global-key-listener docs)
const v = new GlobalKeyboardListener();

// Undefined interval
let interval;

// Async code to wait for key presses
// e -> keyboard event
(async () => {
  await v.addListener((e) => {
    // If the start key is pressed, start clicking at specified intervals
    if (
      e.state.toLocaleLowerCase() === "down" &&
      e.name.toLocaleLowerCase() === config.startKey.toLocaleLowerCase()
    ) {
      interval = setInterval(
        () => robot.mouseClick(config.mouseButton),
        config.millisecondsBetweenEachClick
      );
    }

    // If the end key is pressed, stop the clicking and end the program
    if (
      e.state.toLocaleLowerCase() === "down" &&
      e.name.toLocaleLowerCase() === config.stopKey.toLocaleLowerCase()
    ) {
      clearInterval(interval);
      process.exit();
    }

    // If the pause key is pressed, only clear the interval
    if (
      e.state.toLocaleLowerCase() === "down" &&
      e.name.toLocaleLowerCase() === config.pauseKey.toLocaleLowerCase()
    ) {
      clearInterval(interval);
    }
  });
})();
