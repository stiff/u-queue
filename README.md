# µQueue

Small collection of promise-based queues used in several projects.

## Installation

```npm install --save u-queue```

## Usage

```js
const { queueFactory, singleInstance, sleep, throttlingQueueFactory } = require('u-queue');
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
// Promise {<pending>}
// => [1, 2, 3]
```

### throttlingQueueFactory

Same as `queueFactory` but adds delay after each promise is resolved.

```js
const queue = throttlingQueueFactory({ delay: 1000 });

queue(() => console.log(new Date()));
queue(() => console.log(new Date()));
queue(() => console.log(new Date()));

// Promise {<pending>}
// 11:16:27
// 11:16:28
// 11:16:29
```

### singleInstance

Decorator around async function to run it only once at a time and reuse results for subsequent calls while it's running even if invoked with different arguments.

```js
let start = Date.now();
const f = singleInstance(async (tag) => {
  await sleep(1000);
  return [ tag, Date.now() - start ];
});
console.log(await Promise.all([f(1), f(2), f(3), f(4)]));
// [ [ 1, 1001 ], [ 1, 1001 ], [ 1, 1001 ], [ 1, 1001 ] ]
console.log(await Promise.all([f(1), f(2), f(3), f(4)]));
// [ [ 1, 2002 ], [ 1, 2002 ], [ 1, 2002 ], [ 1, 2002 ] ]
```

### sleep

Creates promise that is resolved after specified milliseconds. Used internally by `throttlingQueueFactory`, but may be useful somewhere else as well.

```js
sleep(3141).then(console.log);
```
