module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    context.el.parent.getFirstEditable().focus();
    return false;
  }
  return true;
};