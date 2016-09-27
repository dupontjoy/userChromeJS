const EXPORTED_SYMBOLS = [
    'isEditableInput',
    'insertAtCursor',
    'killBackwardFromCursor',
    'cleanTagName',
    'lineEditingCallbacks',
    'lineEditingDataCallbacks',
];

var lineEditingCallbacks = {
    paste: (input, data) => {
        insertAtCursor(input, data);
    },
    kill_backward: (input, data) => {
        killBackwardFromCursor(input);
    },
    start_of_line: (input, data) => {
        cursorToStartOfLine(input);
    },
    end_of_line: (input, data) => {
        cursorToEndOfLine(input);
    },
};
var lineEditingDataCallbacks = {
    paste: (vim) => {
        return vim.window.readFromClipboard();
    },
};

function cleanTagName(e) {
    return e.tagName.split(':').pop().toLowerCase();
}

function isEditableInput(e) {
    let tag = cleanTagName(e);
    // XXX
    return tag == "input" || tag == "textarea";
}

function insertAtCursor(e, text) {
    text = text || "";
    var before = e.value.substring(0, e.selectionStart);
    var after = e.value.substring(e.selectionEnd, e.value.length);
    e.value = before + text + after;
    e.selectionStart = e.selectionEnd = before.length + text.length;
}

function killBackwardFromCursor(e) {
    var before = e.value.substring(0, e.selectionStart);
    var start = before.lastIndexOf('\n') + 1;
    before = before.substring(0, start);
    var after = e.value.substring(e.selectionEnd, e.value.length);
    e.value = before + after;
    e.selectionStart = e.selectionEnd = start;
}

function cursorToStartOfLine(e) {
    var start = e.value.lastIndexOf('\n', e.selectionStart) + 1;
    e.selectionStart = e.selectionEnd = start;
}

function cursorToEndOfLine(e) {
    var end = e.value.indexOf('\n', e.selectionEnd) + 1;
    if (end === 0) {
        end = e.value.length;
    }
    e.selectionStart = e.selectionEnd = end;
}
