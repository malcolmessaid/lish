$(document).ready(function(){
    console.log('hello')
  $(document).dblclick( function(){
    console.log('fs')
  //  var test1 = new MySelection();
    //test1.getSelectionData();
  });
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.contextFired == "getSelection"){
      sendResponse({selection: getSelectionData()});
    }

  });
