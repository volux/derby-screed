module.exports = function () {
// TODO need global key binding to #document and store last Screed focus in _page or _session
  var current = this.parent.getCurrentEditableData();
  var editable = this.parent.getComponentByPath(current.path);

  if (editable) {

    editable.moveCursorTo(current.cursor);
  }

  return false;
};