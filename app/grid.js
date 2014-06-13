var dragAndDrop = require('./draganddrop');

var $ = window.$;
var $document = $(window.document);

function Grid(col) {
    this.columns = col || 0;
    this.rows = 0;
    this.sections = [];
    this.$element = $('<div>', {
        class: 'grid'
    });
}

Grid.prototype.addSection = function(section) {
    this.sections.push(section);
};

Grid.prototype.layout = function() {
    if (this.columns == 0) {
        this.columns = Math.ceil(Math.sqrt(this.sections.length));
    }
    this.rows = Math.ceil(this.sections.length / this.columns);
};

Grid.prototype.render = function() {
    var height = 100 / this.rows;
    var x = 0;
    var y = 0;
    var xPos = 0;
    for (var i in this.sections) {
        var section = this.sections[i];
        var width = section.width || (100 - xPos) / (this.columns - x);
        var $section = $('<div>', {
            class: 'grid-section',
            css: {
                left: xPos.toFixed(2) + '%',
                top: (y * height).toFixed(2) + '%',
                width: width.toFixed(2) + '%',
                height: height.toFixed(2) + '%'
            }
        });
        var $content = $('<div>', {
            class: 'grid-section-content'
        });
        $content.append(section.$element);
        $section.append($content);
        this.$element.append($section);
        if (x < this.columns - 1) {
            var $hbar = $('<div>', {
                class: 'grid-resize-bar-h',
                mousedown: this.resizeColumnHandler(x)
            });
            $section.append($hbar);
            $content.addClass('with-bar-h');
        }
        if (y < this.rows - 1) {
            var $vbar = $('<div>', {
                class: 'grid-resize-bar-v',
                mousedown: this.resizeRowHandler(y)
            });
            $section.append($vbar);
            $content.addClass('with-bar-v');
        }
        if (x < this.columns - 1) {
            x++;
            xPos += width;
        } else {
            x = 0;
            y++;
            xPos = 0;
        }
    }
};

Grid.prototype.resizeColumnHandler = function(x) {
    var self = this;
    return function(evt) {
        evt.preventDefault();
        var pageX = evt.pageX;
        var callback = function(evt) {
            self.resizeColumn(x, pageX - evt.pageX);
            pageX = evt.pageX;
        };
        drageAndDrop.setCursor('col-reisze');
        $document.mousemove(callback);
        $document.mouseup(function(evt) {
            $document.unbind('mousemove', callback);
            drageAndDrop.resetCursor();
        });
    };
};

Grid.prototype.resizeRowHandler = function(y) {
    var self = this;
    return function(evt) {
        evt.preventDefault();
        var pageY = evt.pageY;
        var callback = function(evt) {
            self.resizeRow(y, pageY - evt.pageY);
            pageY = evt.pageY;
        };
        drageAndDrop.setCursor('row-reisze');
        $document.mousemove(callback);
        $document.mouseup(function(evt) {
            $document.unbind('mousemove', callback);
            drageAndDrop.resetCursor();
        });
    };
};

Grid.prototype.resizeColumn = function(x, dx) {
    dx *= 100 / this.$element.width;
    var $section = $('.grid-section').filter(function(i) {
        return i % self.columns == x;
    });
    var width = $section.get(0).style['width'];
    width = parseFloat(width.replace('%', ''));
    width += dx;
    if (width < 10) {
        return false;
    }
    var $section2 = $('.grid-section').filter(function(i) {
        return i % self.columns == x + 1;
    });
    var width2 = $section2.get(0).style['width'];
    width2 = parseFloat(width2.replace('%', ''));
    width2 -= dx;
    if (width2 < 10) {
        return false;
    }
    $section.css({
        width: width.toFixed(2) + '%'
    });
    var left = $section2.get(0).style['left'];
    left = parseFloat(left.replace('%', ''));
    $section2.css({
        left: (left + dx).toFixed(2) + '%',
        width: width2.toFixed(2) + '%'
    });
    return true;
};

Grid.prototype.resizeRow = function(y, dy) {
    dy *= 100 / this.$element.height;
    var $section = $('.grid-section').filter(function(i) {
        return i / self.columns == y;
    });
    var height = $section.get(0).style['height'];
    height = parseFloat(height.replace('%', ''));
    height += dy;
    if (height < 10) {
        return false;
    }
    var $section2 = $('.grid-section').filter(function(i) {
        return i / self.columns == y + 1;
    });
    var height2 = $section2.get(0).style['height'];
    height2 = parseFloat(height2.replace('%', ''));
    height2 -= dy;
    if (height2 < 10) {
        return false;
    }
    $section.css({
        height: height.toFixed(2) + '%'
    });
    var top = $section2.get(0).style['top'];
    top = parseFloat(top.replace('%', ''));
    $section2.css({
        top: (top + dx).toFixed(2) + '%',
        height: height2.toFixed(2) + '%'
    });
    return true;
};

module.exports = Grid;
