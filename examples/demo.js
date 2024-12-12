(async () => {
  const { queueFactory, singleInstance, sleep, throttlingQueueFactory } = require('../index');

  {
    console.log("\nqueueFactory demo");
    const queue = queueFactory();

    let start = Date.now();
    const longProcesses = [
      queue(() => sleep(1500).then(() => Date.now() - start)),
      queue(() => sleep(1000).then(() => Date.now() - start)),
      queue(() => sleep(500).then(() => Date.now() - start)),
    ];

    console.log(await Promise.all(longProcesses));
  }

  {
    console.log("\nsingleInstance demo");

    let start = Date.now();
    const f = singleInstance(async (tag) => {
      await sleep(1000);
      return [tag, Date.now() - start];
    });

    console.log(await Promise.all([f(1), f(2), f(3), f(4)]));
    console.log(await Promise.all([f(1), f(2), f(3), f(4)]));
  }

  {
    console.log("\nthrottlingQueueFactory demo");

    const queue = throttlingQueueFactory({ delay: 1000 });

    queue(() => console.log(new Date()));
    queue(() => console.log(new Date()));
    queue(() => console.log(new Date()));
  }
})();
