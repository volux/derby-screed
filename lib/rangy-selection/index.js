module.exports = function (app) {

  app.on('ready', function () {

    /**
     *
     * @type {*|exports|module.exports|{selectionPrototype, createRange}}
     */
    var rangy = require('rangy');

    /**
     *
     * @param [index=0] {number}
     * @returns {Range}
     */
    rangy.selectionPrototype.range = function (index) {

      index = index || 0;
      return this.getRangeAt(index);
    };

    /**
     *
     * @param range {Object}
     * @returns {Array}
     */
    rangy.selectionPrototype.getElementsInRange = function (range) {

      var elements = range.getNodes([1]); //NodeElement

      if (elements.length === 0) {

        elements.push(range.commonAncestorContainer.parentElement);
      }
      return elements;
    };

    /**
     *
     * @param element {Element|Node}
     * @returns {{element: *, active: (boolean|*)}}
     */
    rangy.selectionPrototype.getStateBeforeReplaceText = function (element) {

      var active = this.containsNode(element, true);
      var state = {
        element: element,
        active: active
      };

      if (active) {

        var range = this.range(0);
        state.start = {
          element: range.startContainer,
          id: range.startContainer.parentElement.id,
          offset: range.startOffset
        };
        state.end = {
          element: range.endContainer,
          id: range.endContainer.parentElement.id,
          offset: range.endOffset
        };
      }

      return state;
    };

    /**
     *
     * @param state {{element: *, active: (boolean|*)}}
     * @param [transformCursor] {Function}
     */
    rangy.selectionPrototype.setStateAfterReplaceText = function (state, transformCursor) {

      transformCursor = transformCursor || function (cursor) { return cursor; };

      if (state.active) {

        if (!state.element) {

          return;
        }
        var range = rangy.createRange();

        if (state.start.id == state.element.id) {

          if (state.element.firstChild) {
            range.setStart(state.element.firstChild, transformCursor(state.start.offset));
          }

        } else {

          if (state.start.element) {
            range.setStart(state.start.element, state.start.offset);
          }
        }
        if (state.end.id == state.element.id) {

          if (state.element.firstChild) {
            range.setEnd(state.element.firstChild, transformCursor(state.end.offset));
          }

        } else {

          if (state.end.element) {
            range.setEnd(state.end.element, state.end.offset);
          }
        }
        range.select();
      }
    };

    /**
     *
     * @param text {Node|Text}
     * @param cursorPosition {number}
     * @returns {rangy.selectionPrototype}
     */
    rangy.selectionPrototype.moveCursorTo = function (text, cursorPosition) {

      if (text) {

        this.collapse(text, cursorPosition);
      }
      return this;
    };

    /**
     *
     * @param node {Element|Node}
     */
    rangy.selectionPrototype.selectNode = function(node) {

      var range = rangy.createRange();

      range.selectNode(node);
      this.setSingleRange(range);
    };

    /**
     *
     * @param fromNode {Element|Node}
     * @param toNode {Element|Node}
     */
    rangy.selectionPrototype.selectNodesFromTo = function(fromNode, toNode) {

      var range = rangy.createRange();

      range.setStartBefore(fromNode);
      range.setEndAfter(toNode);

      this.setSingleRange(range);
    };

    /**
     *
     * @param targetNode {Node|Text}
     * @param insertNode {Element|Node}
     * @param start {number}
     * @param [end] {number}
     * @returns {DocumentFragment} extracted contents between start & end
     */
    rangy.selectionPrototype.insertNode = function(targetNode, insertNode, start, end) {

      end = end || start;

      var range = rangy.createRange();

      range.setStart(targetNode, start);
      range.setEnd(targetNode, end);

      var extractedContents = range.extractContents();

      if (insertNode.textContent === '') {

        insertNode.textContent = extractedContents.textContent;
      }
      range.insertNode(insertNode);
      range.detach();

      return extractedContents;
    };

    rangy.init();

    app.proto.rangy = rangy;
  });
};
