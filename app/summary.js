var jade = require('jade');
var $ = window.$;

function Summary() {
    this.width = 10;
    this.$element = $('<div>', {
        class: 'summary'
    });
}

Summary.prototype.load = function(next) {
    var self = this;
    jade.renderFile('public/templates/summary.jade', {
        title: '介绍'
    }, function(err, html) {
        if (err) {
            return next && next(err);
        }
        self.$element.html(html);
        return next && next();
    });
};

Summary.prototype.render = function() {
};

module.exports = Summary;
