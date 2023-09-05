// Import all required modules
import robot from "robotjs";
import { GlobalKeyboardListener } from "node-global-key-listener";
import { createRequire } from "module";
import chalk from "chalk";

const require = createRequire(import.meta.url);
const config = require("./config.json");

console.log(`
${chalk.green.bold.underline("Autoclicker")}
${chalk.grey("Made by Arnav Thorat!")}

Edit the configuration for the autoclicker in ${chalk.bold(
  "config.json"
)}. Refer to the README for information.

${chalk.underline("Current configuration:")}
Start key:                           ${chalk.bold(config.startKey.toUpperCase())}
Pause key:                           ${chalk.bold(config.pauseKey.toUpperCase())}
Stop key (end process):              ${chalk.bold(config.stopKey.toUpperCase())}
Milliseconds between clicks:         ${chalk.bold(config.millisecondsBetweenEachClick)}
`);

// (refer to node-global-key-listener docs)
const v = new GlobalKeyboardListener();

// Undefined interval
let interval;

// Async code to wait for key presses
// e -> keyboard event
// down -> object, contains the state of keys
await v.addListener((e, down) => {
  // Check if left or right Ctrl is active
  const isCtrlActive = down["LEFT CTRL"] || down["RIGHT CTRL"];

  if (config.isCtrlActive && isCtrlActive !== true) {
    return;
  }

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
