
const VERSION = '1.0.0';

const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const queueFactory = () => {
  var queueImpl = Promise.resolve();
  return (fx) => {
    queueImpl = queueImpl.then(fx);
    return queueImpl;
  }
};

const throttlingQueueFactory = ({ delay }) => {
  var queueImpl = Promise.resolve();
  return (fx) => {
    const res = queueImpl.then(fx);
    queueImpl = res.then(() => sleep(delay));
    return res;
  }
};

module.exports = {
  queueFactory,
  sleep,
  throttlingQueueFactory,
  VERSION
}
