module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.isContentType('boolean')) {

      context.el.shift(1);
      setTimeout(function () {context.el.moveCursorTo(context.selection.focusOffset);}, 0);
      return false;
    }
  }
  return true;
};