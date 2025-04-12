// background-script.js
"use strict";

function onError(error) {
  console.error(`Space Remover: ${error}`);
}

function sendMessageToTabs(tabs) {
  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { msg: "process" })
      .then((response) => {
        if(response) {
          console.log("Space Remover: Successful!");
        }
      })
      .catch(onError);
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(sendMessageToTabs)
    .catch(onError);
});
