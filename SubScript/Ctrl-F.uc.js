// Toggle findbar, and auto highlight keyword
var Init_Find = true;

function HighlightText() {
    var Highlight = gFindBar.getElement("highlight");
    if (Init_Find) {
        Init_Find = false;
        Highlight.setAttribute('checked', true);
    }
    if (Highlight.checked && gFindBar._findField.
        value!=gFindBar._lastHighlightString) {
        Highlight.click(); Highlight.click();
    }
}

(function ToggleFindBar() {
    var cmd_find = document.getElementById("cmd_find");
    if (cmd_find) {
        var cmd_text = cmd_find.getAttribute("oncommand").
            replace("gFindBar.onFindCommand();",
            "if (gFindBar.hidden) { $& HighlightText(); }"
            +"\nelse gFindBar.close();")
        cmd_find.setAttribute("oncommand", cmd_text);

        eval('XULBrowserWindow.onLocationChange = ' +
            XULBrowserWindow.onLocationChange.toString()
            .replace('gFindBar.getElement("highlight")',
            '// $&'));
    }
})();