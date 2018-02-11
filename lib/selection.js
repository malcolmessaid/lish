// This JS file will be used to define, create, and modify the selection obeject
// I will create. I'm not sure if classes in JS work the same as in Java, but I
// want to create an individaul file for this just for the sake of orgnization.

//input should be Javascript selection object
function MyRange() {
  var selection = window.getSelection();
  this.text = selection.toString();
  this.range = selection.getRangeAt(0)

// If selection is across just one node.
  this.spanTagsSimple = function(){
    console.log('simple')
    var span = document.createElement('SPAN');
    span.textContent = this.text;
    this.range.deleteContents();
    this.range.insertNode(span);
  };


  // Puts span tags around selection if selection is over multiple tags
  this.spanTagsComplex = function(){
    console.log('complex')
    var outerNode = this.range.commonAncestorContainer;
    // Creating a 'complex' tag to go around the common Ancestor of all of the selected text
    var complexSpan = document.createElement('complex');
    var complexRange = document.createRange();

    complexRange.surroundContents(outerNode);



    // var clone = this.range.cloneContents();
    // //console.log(clone.querySelectorAll("*"))
    // complexRange.setStartBefore(this.range.startContainer);
    // complexRange.setEndAfter(this.range.endContainer);
  }
}





// When the user click highight, this function is called. Right now it
// gets the selection. A selection object in Javacript ahas something called
// a Range. The range object is essentially everything that I wanted to create
// with this library.

// Eventually will just use the complex span tag
var getSelectionData = function(){
  var userSelection = new MyRange();
  var start = userSelection.range.startContainer;
  var end = userSelection.range.endContainer;
  if (start.isEqualNode(end)){
    userSelection.spanTagsSimple();
  }
  else {
    userSelection.spanTagsComplex();
  }

}
