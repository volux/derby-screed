module.exports = function () {

  this.model.set('expand', !this.model.get('expand'));
  return false;
};