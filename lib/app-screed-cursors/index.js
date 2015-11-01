module.exports = function(app) {

  if (!app.proto.cursorLabelForUser) {
    /**
     * for example, rewrite in real app
     * @param userId {string}
     * @returns {string}
     */
    app.proto.cursorLabelForUser = function (userId) {

      if (userId) {

        return userId.split('-')[0];
      }
      return '???';
    };
  }

  if (!app.proto.cursorColorForUser) {
    /**
     * for example, rewrite in real app
     * @param userId {string}
     * @returns {string}
     */
    app.proto.cursorColorForUser = function (userId) {

      var channel = function (uid, index) {
        return uid.charCodeAt(index) + 100;
      };

      if (userId) {

        var uid = userId.substring(0, 3);
        return 'rgba(' + channel(uid, 0) + ', ' + channel(uid, 1) + ', ' + channel(uid, 2) + ', .5)';
      }
      return 'rgba(200, 0, 0, .5)';
    };
  }
};
