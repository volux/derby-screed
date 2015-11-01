module.exports = function(app, options) {

  app.use(require('derby-keyboard-combokeys'));
  app.use(require('./lib/rangy-selection'));
  app.use(require('./lib/app-screed-cursors'));

  app.component(require('./d-screed'));
  app.component(require('./d-screed/doc'));
  app.component(require('./d-screed/section'));
  app.component(require('./d-screed/wrapper'));
  app.component(require('./d-screed/block'));
  app.component(require('./d-screed/line'));
  app.component(require('./d-screed/typed'));
  app.component(require('./d-screed/field'));
  app.component(require('./d-screed/inline'));
  app.component(require('./d-screed/attribute'));
  app.component(require('./d-screed/cursors'));
  app.component(require('./d-screed/cursor'));

  //if(!options || (options && options.loadStyles)) app.loadStyles(__dirname);
};