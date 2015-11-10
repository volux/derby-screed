module.exports = function () {

  //this.getSelection().selectAllChildren(this.getNode());
  // TODO Not works properly. Fix it!
  var fromNode = this.getFirstEditable().getNode();
  var toNode = this.getLastEditable().getNode();

  //console.log([fromNode, toNode]);
  this.getSelection().selectNodesFromTo(fromNode, toNode);
  return false;
};