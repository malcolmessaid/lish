var rightClickResponse = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {contextFired: "getSelection"}, function(response){ //This activates the onMessage handler
    //  console.log(response.selection); //QUESTION: What do you want this part to actually do? 
    });
  });
};

//Create the actual menu
chrome.contextMenus.create({
  title: "Highlight '%s'",
  contexts:["selection"],
  onclick: rightClickResponse
});
