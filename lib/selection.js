// This file is the heart of the library. It is where the functions/objects/methods are that run
// the library and allow it to perform its functionality. Most of the code is run through the
// myRange Object.




// Contructor for WebPage Object. Used to store information about each webpage.
// Right now it is static.
function WebPage(){
  this.list = {};
  this.addHash = function(hash, text){
    this.list[hash] = text;
  }
}

// Creates the webpage object that stores a list of the hashes of all the highlights made.
// Can be used to store other things aswell. Done when page is loaded.
var webPageData = new WebPage();




// This function is a helper function for the spanTagsComplex method. It is called when the last node needs to be wrapped.
function spanTagsComplexHelperEnd(node, text, hash){
  var range = new Range();

  range.setEndAfter(node);
  range.setStartBefore(node)

  var span = document.createElement('SPAN');
  span.innerHTML = text;
  span.classList.add('working');
  span.classList.add(hash);
  range.insertNode(span);
  range.detach();
}


// This function is a helper function for the spanTagsComplex method. It is called when the first node needs to be wrapped.
function spanTagsComplexHelperStart(node, text, hash){
  var range = new Range();
  //console.log(node)
  range.setStartAfter(node);

  var span = document.createElement('SPAN');
  span.innerHTML = text;
  span.classList.add('working');
  span.classList.add(hash);
  range.insertNode(span);
  range.detach();
}

// This is intended to do the same as the above functions but for all the other nodes. At some point,
// I would like for it to implement the spanTagsSimple method, but right now it does not. It is not
// functional at the moment.
function spanTagsComplexHelperMiddle(node, hash){ // TODO: Make this Work.
  var range = new Range();
  console.log(node.parentNode)
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
 console.log(possibleNodesInSelection)

  for (var i = 0; i < possibleNodesInSelection.length; i++) {
    if (select.containsNode(possibleNodesInSelection[i], true)) temp.push(possibleNodesInSelection[i]);
  //  console.log(possibleNodesInSelection[i].firstElementChild)
  }
 console.log(temp)
  return temp;
}

function areSiblings(){

}

function isAParent(){

}



// Constructor for the MyRange object. This object is created from the UserSelection and is fired when
// the usur 'highlights' something from the context menu. It gathers necesassy information about the selection,
// creates a range object, hashes the content, and has the methods that will wrap the selection.
function MyRange(select) {
  var selection = select;
  this.text = selection.toString();
  this.range = selection.getRangeAt(0);
  this.ancestor = this.range.commonAncestorContainer;
  this.url = this.range.startContainer.baseURI;
  this.hash = this.text.hashCode()
  webPageData.addHash(this.hash, this.text);
  this.nodesInSelection = getNodes(this.ancestor, selection);


  //The method that wraps the node if selection is across just one element.
  this.spanTagsSimple = function(){
    console.log('simple');
    var span = document.createElement('SPAN');
    span.innerHTML = this.text;
    span.classList.add(this.hash);
    span.classList.add('working');
    this.range.deleteContents();
    this.range.insertNode(span);
    this.range.detach();
  };




  // This is the method that is called to wrap the elements if the selection is across multiple nodes.
  // This calls the above helper functions.
  this.spanTagsComplex = function(){
    console.log('complex')
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

    var startEndUse = selection.getRangeAt(0).cloneContents().querySelectorAll("*");
    console.log(startEndUse)

    start.textContent = start.textContent.substr(0, start.length - startEndUse[0].textContent.length)
    end.textContent = end.textContent.substr(startEndUse[startEndUse.length-1].textContent.length)

    spanTagsComplexHelperStart(start, startEndUse[0].textContent, this.hash);
    spanTagsComplexHelperEnd(end, startEndUse[startEndUse.length-1].textContent, this.hash);


    for(var i = 1; i < this.nodesInSelection.length -1; i++){
      console.log(this.nodesInSelection[i])
      spanTagsComplexHelperMiddle(this.nodesInSelection[i], this.hash)
    }
  }
}


function simplifySelection() {
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);
  var all = range.commonAncestorContainer.getElementsByTagName('*');
  var temp = [];
  console.log(all)

  for (var i = 0; i < all.length; i++) {
    if (selection.containsNode(all[i], true)) temp.push(all[i]);

  }
  console.log(temp)
  for (var i = 0; i < temp.length; i++) {

    if(temp[i].firstElementChild){
      selection.selectAllChildren(temp[i])
      var tempSelection = new MyRange(window.getSelection());
      console.log(tempSelection.nodesInSelection)
      tempSelection.nodesInSelection.slice(1)
      tempSelection.spanTagsComplex()
      break;
    }
  }
  var tempSelection = new MyRange(window.getSelection());
  //tempSelection.spanTagsComplex()

}


//The function that is fired through the chrome extnetsion and calls the appropriate spanTags method.
var getSelectionData = function(){
  var userSelection = new MyRange(window.getSelection());
  if(userSelection.range.startContainer.isEqualNode(userSelection.range.endContainer)) userSelection.spanTagsSimple();
  else userSelection.spanTagsComplex();
}



// Hash Function taken from Stack Overflow
//https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
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
