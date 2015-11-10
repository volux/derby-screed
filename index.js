module.exports = function(app) {

  app.use(require('derby-keyboard-combokeys'));
  app.use(require('./lib/rangy-selection'));
  app.use(require('./lib/app-screed-methods'));

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
  app.component(require('./d-screed/table'));
  app.component(require('./d-screed/tbody'));
  app.component(require('./d-screed/tr'));
  app.component(require('./d-screed/td'));
  app.component(require('./d-screed/cursors'));
  app.component(require('./d-screed/cursor'));

};