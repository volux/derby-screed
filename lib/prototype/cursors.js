/**
 *
 * @type {getDomElementClientRectangles|*}
 */
var getDomElementClientRectangles = require('dom-element-client-rectangles');

module.exports = Cursors;

/**
 * @class Cursors
 */
function Cursors() {
}

Cursors.prototype.init = function () {

  //this.model.del('data.empty');
  this.model.start('cursorsIds', 'data', function(items){

    if (!items) return [];

    return Object.keys(items);
  });
  this.model.on('change', 'data**', this.repositionCursors.bind(this));
};

Cursors.prototype.create = function () {

  this.repositionCursors();
};

/**
 *
 * @returns {Element|Node}
 */
Cursors.prototype.getNode = function () {

  return this['$node'];
};

/**
 *
 * @param editable {Editable|Unit}
 * @param cursor {{start: number, end: number}}
 * @param screedNode {Element}
 * @returns {{top: number, left: number, height: number, width: number}[]}
 */
Cursors.prototype.getCursorPositions = function (editable, cursor, screedNode) {

  var positions;
  /**
   *
   * @type {Element|Node}
   */
  var node = editable.getNode();
  /**
   *
   * @type {string}
   */
  var nodeTextContent = node.textContent;
  /**
   *
   * @type {Node|Text}
   */
  var text = editable.getTextNode(node);
  /**
   *
   * @type {Element}
   */
  var precursor = document.createElement('span');

  if (cursor.start === cursor.end) {

    precursor.appendChild(document.createTextNode('\u200b'));
  }
  if (text) {

    editable.getSelection().insertNode(
      text,
      precursor,
      Math.min(cursor.start, text.length),
      Math.min(cursor.end, text.length)
    );

  } else {

    node.appendChild(precursor);
  }
  positions = getDomElementClientRectangles(precursor, screedNode);
  node.removeChild(precursor);

  if (text) {

    if (editable.replaceNodeContent) {

      editable.replaceNodeContent(nodeTextContent);

    } else {

      //TODO console.log(editable); its editable.parent !!! Think about...
    }

  } else {

    editable.normalizeNodeContent();
  }

  return positions;
};

/**
 *
 * @returns {string}
 */
Cursors.prototype.getUserId = function () {

  return this.model.get('userId'); // or this.model.root.get('_session.userId')
};

/**
 * TODO Why not used value???
 * @param [cursorId] {string}
 * @param [value]
 * @param [previous]
 * @param [passed] {{}}
 */
Cursors.prototype.repositionCursors = function (cursorId, value, previous, passed) {

  var cursorsData = this.model.at('data');

  //if (cursorsData.get().empty) return;

  var self = this;
  var localUserId = this.getUserId();
  var reposition = function (cursorId) {

    /**
     * @type {{userId: string, selected: {path: string, start: number, end: number}[]}}
     */
    var cursor = cursorsData.get(cursorId);

    if (!cursor) return;
    if (cursor.selected) return;
    if (cursor.userId === localUserId) return;

    var positions = [];
    var screedNode = self.parent.getNode();

    setTimeout(function () {
      cursor.selected.forEach(function (selected) {

        /**
         *
         * @type {Editable|Unit|*}
         */
        var editable = self.parent.getComponentByPath(selected.path);

        if (editable) {

          positions = positions.concat(self.getCursorPositions(editable, selected, screedNode));
        }
      });
      self.model.set('positions.' + cursorId, positions);
    }, 0)
  };

  if (passed && passed['$remote']) {

    reposition(cursorId);
    return;
  }
  if (!cursorId) {

    this.model.get('cursorsIds').forEach(reposition);
  }

};

