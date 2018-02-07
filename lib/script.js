var rightClickResponse = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {contextFired: "getSelection"}, function(response) {
      console.log(response.selection)
    });
  });
}

chrome.contextMenus.create({
  title: "Highlight '%s'",
  contexts:["selection"],
  onclick: rightClickResponse
});
