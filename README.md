# JS Countdown Object

## How to use
- create a new instance of the JS Countdown
- specify the paramters in the config object to change start date, end date, and more (see code below)
- you can use any HTML selector to add the countdown object

```js
// example
// specify the config object
var countdownConfig = {
    countdownEnd: '12 Jul 2023 12:00',
    countdownStart: '10 Jul 2023 12:00',
    selector: 'div#countdown',
    theme: 'light',
    autoStart: false,
}
// create a new countdown and add the config (or leave empty for default values)
var countdown = new Countdown(countdownConfig);
```