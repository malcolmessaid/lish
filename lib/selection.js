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

function MyRange() {
  var selection = window.getSelection();
  this.text = selection.toString();
  this.range = selection.getRangeAt(0);
  this.url = this.range.startContainer.baseURI;
  this.hash = this.text.hashCode()
  webPageData.addHash(this.hash, this.text);
  //console.log(webPageData.list)
  //console.log(this.hash)


  //If selection is across just one node.
  this.spanTagsSimple = function(){
    console.log('simple');
    var span = document.createElement('SPAN');
    span.innerHTML = this.text;
    span.classList.add(this.hash);
    this.range.deleteContents();
    this.range.insertNode(span);
  };


  // Puts span tags around selection if selection is over multiple tags
  this.spanTagsComplex = function(){ //TODO: get this part to work
    console.log('complex');
    // Creating a 'complex' tag to go around the common Ancestor of all of the selected text
    var nodesInSelection = selection.getRangeAt(0).extractContents().querySelectorAll("*");
    console.log(nodesInSelection)
    for(var i = 0; i < nodesInSelection.length; i++){

      //console.log('not a span')
    //  console.log(nodesInSelection[i])

      var span = document.createElement('span');
      span.innerText = nodesInSelection[i].innerText;
      span.className = this.hash;
      console.log(selection.getRangeAt(0).commonAncestorContainer.children)
      if(i == nodesInSelection.length - 1){
        console.log(selection.getRangeAt(0).commonAncestorContainer.children[i]);
        selection.getRangeAt(0).commonAncestorContainer.children[i].prepend(span);
      }
      else selection.getRangeAt(0).commonAncestorContainer.children[i].append(span);

    }
  }


  this.spanSpanTags = function(){

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


// var skip = false;
// for (var j = 0; j < nodesInSelection[i].classList.length; j++) {
//   if (nodesInSelection[i].classList[j] in webPageData.list &&  nodesInSelection[i].tagName === "SPAN"){
//     var classTemp = nodesInSelection[i].classList[j] + " " + this.hash;
//     skip = true;
//   }
// }
// if (skip) continue;
