module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    context.el.shift(-1);
    return false;
  }
  return true;
};