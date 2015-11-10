module.exports = {

  // delete to left
  'backspace': {
    'action': require('../doc/actions/backspace')
  },

  // delete row
  'alt+backspace': {
    'action': require('./actions/delete-row')
  },

  // delete row
  'ctrl+backspace': {
    'action': require('./actions/delete-row')
  },

  // delete row
  'mod+backspace': {
    'action': require('./actions/delete-row')
  },

  // delete word to left
  'shift+alt+backspace': {
    'action': require('../doc/actions/backspace')
  },

  // delete line to start
  'shift+mod+backspace': {
    'action': require('../doc/actions/backspace')
  },

  // delete from right
  'del': {
    'action': require('../doc/actions/del')
  },

  // delete row
  'alt+del': {
    'action': require('./actions/delete-row')
  },

  // delete row
  'ctrl+del': {
    'action': require('./actions/delete-row')
  },

  // delete row
  'mod+del': {
    'action': require('./actions/delete-row')
  },

  // delete word to right
  'shift+alt+del': {
    'action': require('../doc/actions/del')
  },

  // delete line to end
  'shift+mod+del': {
    'action': require('../doc/actions/del')
  },

  // new line, move to next row cell
  'enter': {
    'action': require('../doc/actions/enter') // './actions/enter'
  },

  // new row, stay in field
  'shift+enter': {
    'action': require('./actions/new-row-and-stay')
  },

  // new row after
  'mod+enter': {
    'action': require('./actions/new-row')
  },

  // new row after
  'alt+enter': {
    'action': require('./actions/new-row')
  },

  // blur (maybe reset value)
  //'escape': {
  //  'action': require('../doc/actions/escape')
  //},

  // next row same index cell
  'down': {
    'action': require('../doc/actions/down')
  },

  // prev row same index cell
  'up': {
    'action': require('../doc/actions/up')
  },

  // duplicate line or card (selection)
  'ctrl+d': { // alt+d
    'action': require('./actions/duplicate')
  },

  // 'alt+up': // first content editable in card
  'alt+up': {
    'action': require('../doc/actions/go-to-first-content-editable-in-section')
  },

  // 'alt+down': // last content editable in card
  'alt+down': {
    'action': require('../doc/actions/go-to-last-content-editable-in-section')
  },

  // 'pageup': // go to prev row // fn+up
  'pageup': {
    'action': require('../doc/actions/up')
  },

  // 'pagedown': // go to next row // fn+down
  'pagedown': {
    'action': require('../doc/actions/down')
  },

  // 'alt+home': // go to first row // fn+alt+left
  'alt+home': {
    'action': require('./actions/go-to-first-row')
  },

  // 'alt+end': // go to last row // fn+alt+right
  'alt+end': {
    'action': require('./actions/go-to-last-row')
  },

  // 'shift+alt+up': // move row up
  'shift+alt+up': {
    'action': require('../doc/actions/move-up')
  },

  // 'shift+alt+down': // move row down
  'shift+alt+down': {
    'action': require('../doc/actions/move-down')
  },

  // 'shift+alt+left': // pop section // increase rating star
  'shift+alt+left': {
    'action': require('../doc/actions/move-left-section')
  },

  // 'shift+alt+right': // deep section // decrease rating star
  'shift+alt+right': {
    'action': require('../doc/actions/move-right-section')
  },

  // select all // move to paper: do not work there
  'mod+a': {
    'action': require('../doc/actions/select-all')
  }

  // 'mod+/': // memo notice
  // 'mod+~': // switch sections list
  // 'mod+l': // lock screed
  // 'mod+alt+l': // lock card

  // 'alt+space': // values list

  // 'ctrl+num': // bookmark
  // 'ctrl+shift+num': // move to bookmark

};