module.exports = {

  // delete symbol to left, glue with prev editable
  'backspace': {
    'action': require('./actions/backspace')
  },

  // glue with prev section
  'alt+backspace': {
    'action': require('./actions/glue-with-prev-section')
  },

  // glue with prev section
  'ctrl+backspace': {
    'action': require('./actions/glue-with-prev-section')
  },

  // delete line
  'mod+backspace': {
    'action': require('./actions/delete-line')
  },

  // delete word to left
  'shift+alt+backspace': {
    'action': require('./actions/backspace')
  },

  // delete line to start
  'shift+mod+backspace': {
    'action': require('./actions/backspace')
  },

  // delete symbol from right
  'del': {
    'action': require('./actions/del')
  },

  // delete word to right
  'alt+del': {
    'action': require('./actions/del')
  },

  // glue with next section // mod+fn+backspace
  'ctrl+del': {
    'action': require('./actions/glue-with-next-section')
  },

  // glue with next section // mod+fn+backspace
  'mod+del': {
    'action': require('./actions/glue-with-next-section')
  },

  // delete word to right
  'shift+alt+del': {
    'action': require('./actions/del')
  },

  // delete line to end
  'shift+mod+del': {
    'action': require('./actions/del')
  },

  // new line, move to next field
  'enter': {
    'action': require('./actions/enter')
  },

  // new line, stay in field
  'shift+enter': {
    'action': require('./actions/new-editable-after-and-stay')
  },

  // new section after with same header // TODO move to custom doc
  'alt+enter': {
    'action': require('./actions/new-section-after')
  },

  // new BLANK section after
  'mod+enter': {
    'action': require('./actions/new-blank-section-after')
  },
  'ctrl+enter': {
    'action': require('./actions/new-blank-section-after')
  },

  // 'shift+alt+enter': // new BLANK section before

  // shift style, shift value, next field - to right
  'tab': {
    'action': require('./actions/tab')
  },

  // shift style, shift value, next field - to left
  'shift+tab': {
    'action': require('./actions/shift-tab')
  },

  // 'alt+tab': // forward alt shift (from lookup)
  'alt+tab': {
    'action': require('./actions/alt-tab')
  },
  // 'alt+shift+tab': // backward alt shift (from lookup)
  'alt+shift+tab': {
    'action': require('./actions/alt-shift-tab')
  },

  // blur (maybe reset value)
  'escape': {
    'action': require('./actions/escape')
  },

  // next line in form field
  'down': {
    'action': require('./actions/down')
  },

  // prev line in form field
  'up': {
    'action': require('./actions/up')
  },

  // duplicate line (selection) // TODO implement duplicate selection
  'ctrl+d': { // alt+d
    'action': require('./actions/duplicate')
  },

  // 'alt+up': // first content editable in section
  'alt+up': {
    'action': require('./actions/go-to-first-content-editable-in-section')
  },

  // 'alt+down': // last content editable in section
  'alt+down': {
    'action': require('./actions/go-to-last-content-editable-in-section')
  },

  // 'pageup': // go to prev section // fn+up
  'pageup': {
    'action': require('./actions/go-to-prev-section')
  },

  // 'pagedown': // go to next section // fn+down
  'pagedown': {
    'action': require('./actions/go-to-next-section')
  },

  // 'alt+home': // go to first section // fn+alt+home
  'alt+home': {
    'action': require('./actions/go-to-first-section')
  },

  // 'alt+end': // go to last section // fn+alt+right
  'alt+end': {
    'action': require('./actions/go-to-last-section')
  },

  // 'shift+alt+up': // move section up
  'shift+alt+up': {
    'action': require('./actions/move-up')
  },

  // 'shift+alt+down': // move section down
  'shift+alt+down': {
    'action': require('./actions/move-down')
  },

  // 'shift+alt+left': // pop section
  'shift+alt+left': {
    'action': require('./actions/move-left-section')
  },

  // 'shift+alt+right': // deep section
  'shift+alt+right': {
    'action': require('./actions/move-right-section')
  },

  // 'mod+|': // current focus (after lost focus) // TODO bind to #document and create handler in app.proto
  //'mod+\\': {
  //  'action': require('./actions/current-focus')
  //},

  // 'ctrl+e': // expand // TODO move to custom doc
  'ctrl+e': {
    'action': require('./actions/expand')
  },

  // select all // move to paper: do not work there // TODO fix it
  'mod+a': {
    'action': require('./actions/select-all')
  }

  // 'mod+/': // memo notice
  // 'mod+~': // switch sections list
  // 'mod+l': // lock screed
  // 'mod+alt+l': // lock section

  // 'alt+space': // values list
  // 'alt+f': // first appearance character // custom

  // 'ctrl+num': // bookmark
  // 'ctrl+shift+num': // move to bookmark

};