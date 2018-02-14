// This JS file will be used to define, create, and modify the selection obeject
// I will create. I'm not sure if classes in JS work the same as in Java, but I
// want to create an individaul file for this just for the sake of orgnization.

//input should be Javascript selection object
function MyRange() {
  var selection = window.getSelection();
  this.text = selection.toString();
  this.range = selection.getRangeAt(0);

  //If selection is across just one node.
  this.spanTagsSimple = function(){
    console.log('simple');
    var span = document.createElement('SPAN');
    span.textContent = this.text;
    this.range.deleteContents();
    this.range.insertNode(span);
  };

  // Puts span tags around selection if selection is over multiple tags
  this.spanTagsComplex = function(){ //TODO: get this part to work
    console.log('complex');

    var outerNode = selection.getRangeAt(0).commonAncestorContainer;
    // Creating a 'complex' tag to go around the common Ancestor of all of the selected text

    var nodesInSelection = selection.getRangeAt(0).cloneContents().querySelectorAll("*");
    console.log(nodesInSelection);
    for(var i = 0; i < nodesInSelection.length; i++){
      var span = document.createElement('span');
      span.innerText = nodesInSelection[i].innerText;
      nodesInSelection[i].innerText = "";
      nodesInSelection[i].appendChild(span);
    }

    //TODO: Make this actually update the webpage
    console.log(nodesInSelection);
    /*var complexSpan = document.createElement('complex');
    var complexRange = document.createRange();
    complexRange.surroundContents(outerNode);*/
  }
}

//This function is called when the user gets the selection. Spans the selection
var getSelectionData = function(){
  var userSelection = new MyRange();
  var start = userSelection.range.startContainer;
  var end = userSelection.range.endContainer;

  //If the selection is over multiple tags, use complex. Else use simple
  if(start.isEqualNode(end)) userSelection.spanTagsSimple();
  else userSelection.spanTagsComplex();
}
