// content-script.js
"use strict";

browser.runtime.onMessage.addListener((request) => {
    if(request.msg === "process") {
        return Promise.resolve(getSelectedText());
    }
});

function getSelectedText() {
    if ( // there is a focused element
        document.hasFocus() &&
        document.activeElement !== document.body &&
        document.activeElement !== document.documentElement
    ) {
        const activeTextarea = document.activeElement;
        const selection = activeTextarea.value.substring(
            activeTextarea.selectionStart,
            activeTextarea.selectionEnd,
        );
        document.getElementById(document.activeElement.id).value = selection.replace(/\s{2,}/g,' ').trim();
        return true;
    }
    throw new Error("Something went wrong! Maybe you hadn't selected any text?");
}
