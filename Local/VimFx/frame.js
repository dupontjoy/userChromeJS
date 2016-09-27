let {utils: Cu} = Components;
let {
    isEditableInput,
    insertAtCursor,
    killBackwardFromCursor,
    cleanTagName,
    lineEditingCallbacks,
    lineEditingDataCallbacks,
} = Cu.import(`${__dirname}/shared.js`, {});

let findActiveElement = (document) => {
    let inner = (document) => {
        let active = document.activeElement;
        if (active) {
            let tag = cleanTagName(active);
            if (tag == "iframe") {
                return inner(active.contentDocument);
            }
            else {
                return active;
            }
        }
    };
    return inner(document);
};

let lineEditingBinding = (name) => {
    vimfx.listen(name, (data, cb) => {
        let active = findActiveElement(content.document);
        if (active && isEditableInput(active)) {
            lineEditingCallbacks[name](active, data);
        }
    });
};

lineEditingBinding('paste');
lineEditingBinding('kill_backward');
lineEditingBinding('start_of_line');
lineEditingBinding('end_of_line');

sendAsyncMessage('VimFx-config:tabCreated');

vimfx.listen('normalizeTwitterLinks', () => {
  Array.forEach(
    content.document.querySelectorAll('a[data-url]'),
    anchor => anchor.href = anchor.dataset.url
  )
})