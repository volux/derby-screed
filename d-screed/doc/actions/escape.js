module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    context.el.blur();
    return false;
  }
  return true;
};