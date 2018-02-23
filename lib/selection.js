// This JS file will be used to define, create, and modify the selection obeject
// I will create. I'm not sure if classes in JS work the same as in Java, but I
// want to create an individaul file for this just for the sake of orgnization.


// Contructor for WebPage Object. Used to store information about each webpage.
// Right now it is static.I
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
function spanTagsComplexHelperMiddle(node3, text){ @ // TODO: Make this Work.
  var finalRange = new Range();

  finalRange.setStartAfter(node3)

  var finalSpan = document.createElement('SPAN');
  finalSpan.innerHTML = text;
  finalSpan.classList.add('working');
  finalRange.insertNode(finalSpan);
  finalRange.detach();
}


// Constructor for the MyRange object. This object is created from the UserSelection and is fired when
// the usur 'highlights' something from the context menu. It gathers necesassy information about the selection,
// creates a range object, hashes the content, and has the methods that will wrap the selection.
function MyRange() {
  // Setting Fields
  var selection = window.getSelection();
  this.text = selection.toString();
  this.range = selection.getRangeAt(0);
  this.url = this.range.startContainer.baseURI;
  this.hash = this.text.hashCode()
  webPageData.addHash(this.hash, this.text);


  //The method that wraps the node if selection is across just one element.
  this.spanTagsSimple = function(){
    console.log('simple');
    var span = document.createElement('SPAN');
    span.innerHTML = this.text;
    span.classList.add(this.hash);
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
    var nodeList = [];


    // Makes sure start and end are in the correct order. //@SEE isSelectionBackwards()
    if(isSelectionBackwards()){
      start = focus;
      end = anchor;
    }

    // nodesInSelection is copy of all the nodes in the selection
    var nodesInSelection = selection.getRangeAt(0).extractContents().querySelectorAll("*");
    console.log(nodesInSelection)


// An Experiment that I'm not using right now.
    // if (start.nextSibiling) {
    //   nodeList.push(start.nextSibiling);
    //   tempNode = start.nextSibiling;
    //
    // }
    // else if (start.firstChild){
    //   nodeList.push(start.firstChild);
    //   nodeList = start.firstChild;
    // }
    //
    // for (var i = 1; i < nodesInSelection.length; i++) {
    //   if (nodeList[i-1] === end){
    //     break;
    //   }
    //   else if (nodeList[i-1].nextSibiling) {
    //     nodeList.push(nodeList[i-1].nextSibiling);
    //
    //   }
    //   else if (nodeList[i-1].firstChild){
    //     nodeList.push(nodeList[i-1].firstChild);
    //   }
    // }



// Loops through the nodes in selection array, calling the helper functions
    for(var i = 0; i < nodesInSelection.length; i++){

      if (i == 0){
        console.log(nodeList[0])
        spanTagsComplexHelperStart(start, nodesInSelection[i].textContent, this.hash);
      }
      else if (i == nodesInSelection.length -1 ){
       spanTagsComplexHelperEnd(end, nodesInSelection[i].textContent, this.hash);
      }
      else {
      //  nodeList.push(spanTagsComplexHelperMiddle(nodeList[i-1], nodesInSelection[i].textContent));
      }
    }
  }
}


//The function that is fired through the chrome extnetsion and calls the appropriate
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
//https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
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
