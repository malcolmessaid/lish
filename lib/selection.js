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

    var nodesInSelection = selection.getRangeAt(0).extractContents().querySelectorAll("*");
    for(var i = nodesInSelection.length - 1; i >= 0; i--){
      console.log(nodesInSelection[i].parentNode);
      var span = document.createElement('span');
      span.innerText = nodesInSelection[i].innerText;
      nodesInSelection[i].innerText = "";
      nodesInSelection[i].appendChild(span);
      selection.getRangeAt(0).insertNode(nodesInSelection[i]);

      /*var rangeText;
      var offset = nodesInSelection[i].parentNode.length - nodesInSelection[i].innerHTML.length;

      if(i == 0){
        rangeText = new Range();
        rangeText.setStart(nodesInSelection[i].parentNode, offset);
        rangeText.setEnd(nodesInSelection[i].parentNode, 0);
      }
      else if(i == nodesInSelection - 2){
        rangeText = new Range();
        rangeText.setStart(nodesInSelection[i].parentNode, 0);
        rangeText.setEnd(nodesInSelection[i].parentNode, offset);
      }
      else{
        rangeText = new Range();
        rangeText.setStart(nodesInSelection[i].parentNode, 0);
        rangeText.setEnd(nodesInSelection[i].parentNode, 0);
      }

      console.log(nodesInSelection[i].parentNode);
      console.log(offset);
      console.log(rangeText);
      rangeText.insertNode(nodesInSelection[i]);*/
    }
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
