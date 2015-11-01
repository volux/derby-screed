module.exports = Cursor;

/**
 * @class Cursor
 */
function Cursor() {
}

Cursor.prototype.init = function () {

  this.model.setNull('isTop', false);
  this.model.setNull('isLeft', true);
  this.model.setNull('isRight', false);

  this.model.on('change', 'positions**', this.changeOrientation.bind(this));
};

/**
 * QuillJS method
 */
Cursor.prototype.changeOrientation = function (path, positions) {

  if (!positions) return;
  if (!positions.length) return;

  var top = parseInt(positions[0].top) || 0;
  var left = parseInt(positions[0].left) || 0;
  var screedNode = this.parent.parent.getNode();

  this.model.set('isTop', top + screedNode.getBoundingClientRect().top <= this['$flag'].offsetHeight);
  this.model.set('isLeft', top <= this['$flag'].offsetHeight);
  this.model.set('isRight', screedNode.offsetWidth - left <= this['$flag'].offsetWidth);
};