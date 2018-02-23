// This JS file will be used to define, create, and modify the selection obeject
// I will create. I'm not sure if classes in JS work the same as in Java, but I
// want to create an individaul file for this just for the sake of orgnization.


// WebPage object. Currently, it is static, but it is used to track the changes (highlights) the user has made.
function WebPage(){
  this.list = {};
  this.addHash = function(hash, text){
    this.list[hash] = text;
  //  console.log(this.list)
  }
}

var webPageData = new WebPage();




function spanTagsComplexHelperEnd(node2, text){
  var finalRange = new Range();
  finalRange.setEndAfter(node2);
  finalRange.setStartBefore(node2)

  var finalSpan = document.createElement('SPAN');
  finalSpan.innerHTML = text;
  finalSpan.classList.add('working');
  finalRange.insertNode(finalSpan);
  finalRange.detach();
}

function spanTagsComplexHelperStart(node1, text){
  var tempRange = new Range();
  tempRange.setStartAfter(node1);

  var tempSpan = document.createElement('SPAN');
  tempSpan.innerHTML = text;
//  console.log(tempSpan.innerHTML)
  tempSpan.classList.add('working');
  //console.log(tempSpan)
  tempRange.insertNode(tempSpan);
  tempRange.detach();
  return(tempSpan)
}

function spanTagsComplexHelperMiddle(node3, text){
  var finalRange = new Range();
  finalRange.setStartAfter(node3)
  var finalSpan = document.createElement('SPAN');
  finalSpan.innerHTML = text;
  finalSpan.classList.add('working');
  finalRange.insertNode(finalSpan);
  finalRange.detach();
  console.log(finalSpan)
  console.log("Line 54 is the span of the middle method")
  return (finalSpan);
}

function MyRange() {
  var selection = window.getSelection();
  this.text = selection.toString();
  this.range = selection.getRangeAt(0);
  this.url = this.range.startContainer.baseURI;
  this.hash = this.text.hashCode()
  webPageData.addHash(this.hash, this.text);


  //If selection is across just one node.
  this.spanTagsSimple = function(){
    console.log('simple');
    var span = document.createElement('SPAN');
    span.innerHTML = this.text;
    span.classList.add(this.hash);
    this.range.deleteContents();
    this.range.insertNode(span);
    this.range.detach();
  };


  // Puts span tags around selection if selection is over multiple tags
  this.spanTagsComplex = function(){ //TODO: get this part to work
    console.log('complex');
    // Creating a 'complex' tag to go around the common Ancestor of all of the selected text
    var sOffset = selection.getRangeAt(0).startOffset;
    var eOffset = selection.getRangeAt(0).endOffset;
    var anchor = selection.anchorNode;
    var focus = selection.focusNode;
    var start = anchor;
    var end = focus;
    var nodeList = [];

    // Anchor and focus nodes have to do with where the user clicks firs not where the nodes are in the Dom. This makes sure the start node is matched with the correct node (either focus or anchor)
    if(isSelectionBackwards()){
      start = focus;
      end = anchor;
      console.log(start)
      console.log(end)

    }
    nodeList.push(start)

    var nodesInSelection = selection.getRangeAt(0).extractContents().querySelectorAll("*");
    console.log(nodesInSelection)
    var tempNode = start;
    console.log(nodeList)

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

    for(var i = 0; i < nodesInSelection.length; i++){

      if (i == 0){
        console.log(nodeList[0])
        spanTagsComplexHelperStart(start, nodesInSelection[i].textContent);
      }
      else if (i == nodesInSelection.length -1 ){
       spanTagsComplexHelperEnd(end, nodesInSelection[i].textContent);
      }
      else {
      //  nodeList.push(spanTagsComplexHelperMiddle(nodeList[i-1], nodesInSelection[i].textContent));
      }
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




// var skip = false;
// for (var j = 0; j < nodesInSelection[i].classList.length; j++) {
//   if (nodesInSelection[i].classList[j] in webPageData.list &&  nodesInSelection[i].tagName === "SPAN"){
//     var classTemp = nodesInSelection[i].classList[j] + " " + this.hash;
//     skip = true;
//   }
// }
// if (skip) continue;
