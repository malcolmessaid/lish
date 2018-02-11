
// This just something I was using the test my code before I implemented the
// content menu button.
$(document).ready(function(){
    console.log('hello')
  $(document).dblclick( function(){
    console.log('fs')
  });
});

// The get dataMethod is in one of the content scripts so in order for it to be called
// from a background scipt they need to communicate w/ each other. This is a reciver.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.contextFired == "getSelection"){
      sendResponse({selection: getSelectionData()});
    }

  });
