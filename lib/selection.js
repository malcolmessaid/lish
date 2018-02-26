// This JS file will be used to define, create, and modify the selection obeject
// I will create. I'm not sure if classes in JS work the same as in Java, but I
// want to create an individual file for this just for the sake of organization.


// Contructor for WebPage Object. Used to store information about each webpage.
// Right now it is static.
function WebPage(){
  // Field of list of Hashes
  this.list = {};

  this.addHash = function(hash, text){
    this.list[hash] = text;
  }
}

// Currently a vestige. Creates the webpage object that stores a list of the hashes of all the highlights made.
// Can be used to store other things aswell.
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
  console.log(node)
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
// functional at the moment. Issue 24 refers to this.
function spanTagsComplexHelperMiddle(node, hash){ // TODO: Make this Work.
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


function getNodes(commonNode, select){
  var temp = [];
  var possibleNodesInSelection = commonNode.getElementsByTagName('*');
  console.log(possibleNodesInSelection)

  for (var i = 0; i < possibleNodesInSelection.length; i++) {
    if (select.containsNode(possibleNodesInSelection[i], true)){
      temp.push(possibleNodesInSelection[i]);
    }
  }

  temp.forEach(function(node){
    node.classList.add('remove');
  })
  return temp;
}




// Constructor for the MyRange object. This object is created from the UserSelection and is fired when
// the user 'highlights' something from the context menu. It gathers necessary information about the selection,
// creates a range object, hashes the content, and has the methods that will wrap the selection.
function MyRange() {
  // Setting Fields
  var selection = window.getSelection();
  this.text = selection.toString();
  this.range = selection.getRangeAt(0);
  this.ancestor = this.range.commonAncestorContainer;
  console.log(this.ancestor);
  this.url = this.range.startContainer.baseURL;
  this.hash = this.text.hashCode()
  webPageData.addHash(this.hash, this.text);


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


  // This is the method that is called to wrap the elements if the selection is across multiple nodes. This calls the above
  // helper functions.
  this.spanTagsComplex = function(){ //TODO: get this part to work
    console.log('complex');

    // Labratory local variables. Still trying to get this to work. Some are vestigial.
    var sOffset = selection.getRangeAt(0).startOffset;
    var eOffset = selection.getRangeAt(0).endOffset;
    var anchor = selection.anchorNode;
    var focus = selection.focusNode;
    var start = anchor;
    var end = focus;
    var nodesInSelection = [];

    // Makes sure start and end are in the correct order. See isSelectionBackwards().
    if(isSelectionBackwards()){
      start = focus;
      end = anchor;
    }

    nodesInSelection = getNodes(this.ancestor, selection);





    // nodesInSelection is copy of all the nodes in the selection
  //  var parent = selection.getRangeAt(0).cloneContents().parentNode;
    var startEndUse = selection.getRangeAt(0).cloneContents().querySelectorAll("*");
    console.log(nodesInSelection);

    console.log(startEndUse[0].textContent)
    start.textContent = start.textContent.substr(0, start.length - startEndUse[0].textContent.length)
    end.textContent = end.textContent.substr(startEndUse[startEndUse.length-1].textContent.length)
    //console.log (startTemp)

    spanTagsComplexHelperStart(start, startEndUse[0].textContent, this.hash);
    spanTagsComplexHelperEnd(end, startEndUse[startEndUse.length-1].textContent, this.hash);

    console.log(start)

    console.log(end)


    for(var i = 1; i < nodesInSelection.length -1; i++){
      console.log(nodesInSelection[i])
      spanTagsComplexHelperMiddle(nodesInSelection[i], this.hash)
    }
  }
}


// The function that is fired through the chrome extension and calls the appropriate
// span tags method.
var getSelectionData = function(){
  var userSelection = new MyRange();
  var start = userSelection.range.startContainer;
  var end = userSelection.range.endContainer;

  //If the selection is over multiple tags, use complex. Else use simple
  if(start.isEqualNode(end)) userSelection.spanTagsSimple();
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
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
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
