const { options } = require('preact');

const flush = Promise.resolve();
const schedule = (cb) => flush.then(cb);

// It's pretty hard to understand, but...
// How often to update the DOM
options.debounceRendering = window.requestAnimationFrame;
// When to perform hooks (after render)
options.requestAnimationFrame = schedule;
