# Autoclicker

Automatically click for automated processes, or just for going AFK!

## How to Use

To use the autoclicker, make sure the `config.json` file is in the same directory as the autoclicker executable.

These are all of the values in `config.json`.

```json
{
  "startKey": "F8",
  "stopKey": "F9",
  "pauseKey": "F10",
  "mouseButton": "left",
  "millisecondsBetweenEachClick": 650
}
```

Make sure the core syntax stays the same to prevent errors. Leave the values of all of the keys in quotes, except for the milliseconds value, which must not be surrounded by quotes.

### `startKey`

Defines what key starts the autoclicker. Can be a letter, number, or function key.

### `stopKey`

Defines what key stops the autoclicker, therefore ending the program. Can be a letter, number, or function key.

### `pauseKey`

Defines what key pauses the autoclicker, leaving it on standby. Can be a letter, number, or function key.

### `mouseButton`

Defines what mouse button the autoclicker should simulate. Only possible values are `left` and `right`.

### `millisecondsBetweenEachClick`

Defines the amount of milliseconds between each click. Must be a number.
