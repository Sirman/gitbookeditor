var jade = require('jade');
var $ = window.$;

function Editor() {
    this.$element = $('<div>', {
        class: 'editor'
    });
}

Editor.prototype.load = function(next) {
    var self = this;
    jade.renderFile('public/templates/editor.jade', {}, function(err, html) {
        if (err) {
            return next && next(err);
        }
        self.$element.html(html);
        return next();
    });
};

Editor.prototype.render = function() {

};

module.exports = Editor;
