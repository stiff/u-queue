
const VERSION = '1.3.0';

const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const queueFactory = () => {
  let queueImpl = Promise.resolve();
  return (fx) => {
    queueImpl = queueImpl.then(fx, fx);
    return queueImpl;
  }
};

const throttlingQueueFactory = ({ delay }) => {
  let queueImpl = queueFactory();
  return (fx) => {
    const res = queueImpl(fx);
    queueImpl(() => sleep(delay));
    return res;
  }
};

const singleInstance = (fx) => {
  let instance;
  return (...args) => {
    if (!instance) {
      instance = fx(...args);
      instance.then(() => instance = null, () => instance = null);
    }
    return instance;
  }
}

module.exports = {
  queueFactory,
  singleInstance,
  sleep,
  throttlingQueueFactory,
  VERSION
}
