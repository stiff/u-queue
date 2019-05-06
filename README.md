# µQueue

Small collection of promise-based queues used in several projects.

## Installation

```npm install --save u-queue```

## Usage

```js
const { queueFactory, sleep, throttlingQueueFactory } = require('u-queue');
```

### queueFactory

Creates simplest queue, that invokes promises one after another.

```js
const queue = queueFactory();

const longProcesses = [
    queue(() => sleep(1500).then(() => 1)),
    queue(() => sleep(1000).then(() => 2)),
    queue(() => sleep(500).then(() => 3)),
];

Promise.all(longProcesses).then(console.log);
// Promise {<pending>}
// => [1, 2, 3]
```

### throttlingQueueFactory

Same as `queueFactory` but adds delay after each promise is resolved.

```js
const queue = throttlingQueueFactory({ delay: 1000 });

queue(() => console.log(new Date()));
queue(() => console.log(new Date()));
queue(() => console.log(new Date()));

// Promise {<pending>}
// 11:16:27
// 11:16:28
// 11:16:29
```

### sleep

Creates promise that is resolved after specified milliseconds. Used internally by `throttlingQueueFactory`, but may be useful somewhere else as well.

```js
sleep(3141);
```
