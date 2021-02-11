import { options } from 'preact';

let effectiveSchedule;
if (typeof queueMicrotask === 'function') {
  effectiveSchedule = (cb) => queueMicrotask(cb);
} else {
  const flush = Promise.resolve();
  const noop = () => {
    // hack to flush event loop asap
  };
  effectiveSchedule = (cb) => {
    flush.then(cb);
    setTimeout(noop, 0);
  };
}
options.debounceRendering = effectiveSchedule;

if (typeof requestAnimationFrame === 'function') {
  options.requestAnimationFrame = (cb) => {
    return requestAnimationFrame((time) => {
      effectiveSchedule(() => {
        cb(time);
      });
    });
  }
}
