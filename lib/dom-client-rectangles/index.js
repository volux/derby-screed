/**
 *
 * @type {getDomClientRectangles|Function}
 */
module.exports = getDomClientRectangles;

/**
 *
 * @param el {Element|{getClientRects: Function}}
 * @param [inEl] {Element}
 * @returns {{top: number, left: number, height: number, width: number}[]}
 */
function getDomClientRectangles(el, inEl) {

  var rectangles = [];
  var body = document.body;
  var docEl = document.documentElement;
  // TODO for all browsers need polyfill https://github.com/mathiasbynens/document.scrollingElement
  var scrollingElement = document['scrollingElement'] || body;

  var rootScrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var rootScrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var rootClientTop = docEl.clientTop || body.clientTop || 0;
  var rootClientLeft = docEl.clientLeft || body.clientLeft || 0;

  var elBoxes = el.getClientRects();
  var keys = Object.keys(elBoxes);
  if (inEl) {

    var inElBox = inEl.getBoundingClientRect();
  }
  keys.forEach(function (key) {

    var elBox = elBoxes[key];
    var top;
    var left;

    if (inEl) {

      top = elBox.top + rootScrollTop - inElBox.top + inEl.scrollTop - rootClientTop;
      left = elBox.left + rootScrollLeft - inElBox.left + inEl.scrollLeft - rootClientLeft;

    } else {

      top = elBox.top + rootScrollTop - rootClientTop;
      left = elBox.left + rootScrollLeft - rootClientLeft;
    }
    if (scrollingElement !== inEl) {

      top = top - scrollingElement.scrollTop;
      left = left - scrollingElement.scrollLeft;
    }
    rectangles.push({
      top: top,
      left: left,
      height: elBox.height,
      width: elBox.width
    });
  });

  return rectangles;
}
