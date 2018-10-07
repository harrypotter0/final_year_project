chrome.browserAction.onClicked.addListener(buttonClicked);
chrome.tabs.onUpdated.addListener(tabChange);

function buttonClicked(tab){
    let msg = {
      "txt" : "activate"
    }
    chrome.tabs.sendMessage(tab.id,msg);
}

function tabChange(tab, info,returnTab){
    let msg = {
      "txt" : "activate"
    }
    chrome.tabs.sendMessage(returnTab.id, msg);
}
