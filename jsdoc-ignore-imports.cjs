exports.handlers = {
  newDoclet: function (e) {
    if (e.doclet.ignored) return;
    if (e.doclet.comment && e.doclet.comment.includes('@import')) {
      e.doclet.ignore = true;
    }
  },
};
