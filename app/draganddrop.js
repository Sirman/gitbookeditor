function DragAndDrop() {
    this.storedStylesheet = null;
}

DragAndDrop.prototype.setCursor = function(cursor) {
    if (this.storedStylesheet) {
        this.storedStylesheet.remove();
    }
    this.storedStylesheet = $('<style>*{ cursor: ' + cursor + ' !important; }</style>'); 
    $('body').append(this.storedStylesheet);
};

DragAndDrop.prototype.resetCursor = function() {
    if (this.storedStylesheet) {
        this.storedStylesheet.remove();
        this.storedStylesheet = null;
    }
};

module.exports = new DragAndDrop();
