// Sends a message to the content scripts when the button is clicked to call the "getSelectionData" function.
// This is necesassy because background scripts and content scripts cannot communicate with each other otherwise.
var rightClickResponse = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {contextFired: "getSelection"}, function(response){ 
    });
  });
};

//Creates the actual button in the right-click menu.
chrome.contextMenus.create({
  title: "Highlight '%s'",
  contexts:["selection"],
  onclick: rightClickResponse
});
