var rightClickResponse = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {contextFired: "getSelection"}, function(response) {
      console.log(response.selection)
    });
  });
}


// Thing that creates the button and call the method.
chrome.contextMenus.create({
  title: "Highlight '%s'",
  contexts:["selection"],
  onclick: rightClickResponse
});




// Recvier if Neceassry

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.contextFired == "getSelection"){
//       sendResponse({selection: getSelectionData()});
//     }
//
//   });
