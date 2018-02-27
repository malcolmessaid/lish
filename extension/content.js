// This recives a message when the button in the right-click menu is clicked and calls the
// wrap function.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.contextFired == "getSelection") sendResponse({selection: wrap()});
});
