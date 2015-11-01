module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    context.el.shift(-1, true);
    return false;
  }
  return true;
};