global.window = window;

var Grid = require('./grid');
var Summary = require('./summary');
var Editor = require('./editor');
var Preview = require('./preview');

var grid = new Grid(3);
var summary = new Summary();
var editor = new Editor();
var preview = new Preview();

grid.addSection(summary);
grid.addSection(editor);
grid.addSection(preview);

grid.render();
summary.render();
editor.render();
preview.render();
