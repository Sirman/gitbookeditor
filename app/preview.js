var jade = require('jade');
var $ = window.$;

function Preview() {
    this.$element = $('<div>', {
        class: 'preview'
    });
}

Preview.prototype.load = function(next) {
    var self = this;
    jade.renderFile('public/templates/preview.jade', {
        preview: '预览'
    }, function(err, html) {
        if (err) {
            return next && next(err);
        }
        self.$element.html(html);
        return next();
    });
};

Preview.prototype.render = function() {

};

module.exports = Preview;
