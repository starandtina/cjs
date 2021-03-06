function run(genfun) {
  // instantiate the generator object
  var gen = genfun();
  // This is the async loop pattern
  function next(err, result) {
    var res;
    if (err) {
      // if err, throw it into the wormhole
      return gen.throw(err);
    } else {
      // if good value, send it
      res = gen.next(result);
    }
    if (!res.done) {
      // if we are not at the end we have an async request to fulfill, we do this by calling `value` as a function
      // and passing it a callback that receives err, `result` for which we'll just use `next()`
      res.value(next);
    }
  }
  // Kick off the async loop
  next();
}
