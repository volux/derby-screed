module.exports = function () {

  //this.app.proto.rangy.getSelection().selectAllChildren(this.getNode());
  // TODO create range from first editable 0 to las editable end
  this.getSelection().selectNode(this.getNode());
  return false;
};