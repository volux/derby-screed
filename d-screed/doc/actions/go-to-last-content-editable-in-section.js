module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    context.el.parent.getLastEditable().focus();
    return false;
  }
  return true;
};