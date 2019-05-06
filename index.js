
const VERSION = '1.1.0';

const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const queueFactory = () => {
  var queueImpl = Promise.resolve();
  return (fx) => {
    queueImpl = queueImpl.then(fx, fx);
    return queueImpl;
  }
};

const throttlingQueueFactory = ({ delay }) => {
  const queueImpl = queueFactory();
  return (fx) => {
    const res = queueImpl(fx);
    queueImpl(() => sleep(delay));
    return res;
  }
};

module.exports = {
  queueFactory,
  sleep,
  throttlingQueueFactory,
  VERSION
}
