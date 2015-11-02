module.exports = function(app) {

  if (!app.proto.screedCursorPropertiesForUser) {
    /**
     * for example, rewrite in real app
     * @param userId {string}
     * @returns {{label: string, color: string, bgColor: string}}
     */
    app.proto.screedCursorPropertiesForUser = function (userId) {

      var label = 'intruder'; // :)
      var color = 'white';
      var bgColor = 'rgba(200, 0, 0, .5)';

      var channel = function (uid, index) {

        return uid.charCodeAt(index) + 100;
      };

      if (userId) {

        // f.e. label = app.model.get('members.' + userId + '.name');
        label = userId.split('-')[0];

        var uid = userId.substring(0, 3);

        bgColor = 'rgba(' + channel(uid, 0) + ', ' + channel(uid, 1) + ', ' + channel(uid, 2) + ', .5)';
      }
      return {
        label: label,
        color: color,
        bgColor: bgColor
      };
    };
  }

};
