

var contextMenuFunction = function(){
  console.log("f")
  alret("here")
  getSelectionData()
}

chrome.contextMenus.create({
  title: "Highlight '%s'",
  contexts:["selection"],
  onclick: contextMenuFunction,
});


// To be called in create function, because I think
