// This file is the heart of the library. It is where the functions/objects/methods are that run
// the library and allow it to perform its functionality. Most of the code is run through the
// myRange Object.





// This function is a helper function for the spanTagsComplex method. It is called when the last node needs to be wrapped.
function spanTagsComplexHelperEnd(node, text, hash){
  var range = new Range();
  range.setEndAfter(node);
  range.setStartBefore(node)

  var span = document.createElement('SPAN');
  span.innerHTML = text;
  span.classList.add('working'); // A testing class used to change css of all highlights
  span.classList.add(hash);
  range.insertNode(span);
  range.detach();
}


// This function is a helper function for the spanTagsComplex method. It is called when the first node needs to be wrapped.
function spanTagsComplexHelperStart(node, text, hash){
  var range = new Range();
  range.setStartAfter(node);
  var span = document.createElement('SPAN');
  span.innerHTML = text;
  span.classList.add('working');
  span.classList.add(hash);
  range.insertNode(span);
  range.detach();
}

// Helper function for wrapping the nodes in the middle of the selection.
function spanTagsComplexHelperMiddle(node, hash){
  var range = new Range();
  range.selectNode(node);

  var span = document.createElement('SPAN');
  var temp = document.createElement(node.tagName)
  span.innerHTML = node.textContent;
  span.classList.add('working');
  span.classList.add(hash);
  range.deleteContents();
  range.insertNode(span);
  range.surroundContents(temp)
  range.detach();
}

// This function takess in the commonAncestorContainer of the selction and loops through all of
// its children and returns an array of just the children in the selection.
function getNodes(commonNode, select){
  var temp = [];
  var possibleNodesInSelection = commonNode.getElementsByTagName('*');

  for (var i = 0; i < possibleNodesInSelection.length; i++) {
    if (select.containsNode(possibleNodesInSelection[i], true)) temp.push(possibleNodesInSelection[i]);
  }
  return temp;
}


// Constructor for the MyRange object. This object is created from a Selection object. The object is created when
// the user clicks highlight in the right-click menu. It gathers necessary information about the selection and stores
// them in nodes. It also contains the methods that do the wrapping.
function MyRange(select) {
  var selection = select;
  this.text = selection.toString();
  this.range = selection.getRangeAt(0);
  this.ancestor = this.range.commonAncestorContainer;
  this.url = this.range.startContainer.baseURI;
  this.hash = this.text.hashCode()
  webPageData.addHash(this.hash, this.text);
  this.nodesInSelection = getNodes(this.ancestor, selection);


  //The method that wraps selection if it is across just one element.
  this.spanTagsSimple = function(){
    var span = document.createElement('SPAN');
    span.innerHTML = this.text;
    span.classList.add(this.hash);
    span.classList.add('working');
    this.range.deleteContents();
    this.range.insertNode(span);
    this.range.detach();
  };




  // This is the method that is called to wrap the elements if the selection is across multiple nodes.
  // This calls a series of helper functions.
  this.spanTagsComplex = function(){
    var sOffset = selection.getRangeAt(0).startOffset;
    var eOffset = selection.getRangeAt(0).endOffset;
    var anchor = selection.anchorNode;
    var focus = selection.focusNode;
    var start = anchor;
    var end = focus;
    if(isSelectionBackwards()){
      start = focus;
      end = anchor;
    }
    // This gets an array of copies of all of the nodes in the selection.
    var startEndUse = selection.getRangeAt(0).cloneContents().querySelectorAll("*");


    start.textContent = start.textContent.substr(0, start.length - startEndUse[0].textContent.length)
    end.textContent = end.textContent.substr(startEndUse[startEndUse.length-1].textContent.length)

    // The beginning and end nodes are edge cases because the only a portion of the node will highlight
    // as opposed to the middle nodes where the entire thing gets wrapped. This is why they have their
    // own functions.
    spanTagsComplexHelperStart(start, startEndUse[0].textContent, this.hash);
    spanTagsComplexHelperEnd(end, startEndUse[startEndUse.length-1].textContent, this.hash);

    // Loops throught the nodesInSelection field, but it starts at 1 and ends once before the end because it deals with only
    // middle nodes.
    for(var i = 1; i < this.nodesInSelection.length -1; i++){
      spanTagsComplexHelperMiddle(this.nodesInSelection[i], this.hash)
    }
  }
}


//The function that is fired through the chrome extension and calls the appropriate spanTags method.
var wrap = function(){
  var userSelection = new MyRange(window.getSelection());
  if(userSelection.range.startContainer.isEqualNode(userSelection.range.endContainer)) userSelection.spanTagsSimple();
  else userSelection.spanTagsComplex();
}



// Hash Function taken from Stack Overflow
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return Math.abs(hash);  // A negative sign (dash) at the beginning of a class amy cause problems
}


 // https://stackoverflow.com/questions/8038683/window-getselection-how-do-you-tell-if-the-anchor-node-comes-before-the-focus
function isSelectionBackwards() {
    var backwards = false;
    if (window.getSelection) {
        var sel = window.getSelection();
        if (!sel.isCollapsed) {
            var range = document.createRange();
            range.setStart(sel.anchorNode, sel.anchorOffset);
            range.setEnd(sel.focusNode, sel.focusOffset);
            backwards = range.collapsed;
            range.detach();
        }
    }
    return backwards;
}
