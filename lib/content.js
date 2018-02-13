//This handler is called by rightClickResponse
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.contextFired == "getSelection") sendResponse({selection: getSelectionData()});
});
