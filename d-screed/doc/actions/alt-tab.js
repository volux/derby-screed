module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    context.el.shift(1, true);
    setTimeout(function () {context.el.moveCursorTo('end');}, 0);
    return false;
  }
  return true;
};