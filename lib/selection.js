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
    var outerNode = this.range.commonAncestorContainer;
    var span = document.createElement('SPAN');
    span.textContent = this.text;
    this.range.deleteContents();
    this.range.insertNode(span);
  };


  // Puts span tags around selection if selection is 

}





// When the user click highight, this function is called. Right now it
// gets the selection. A selection object in Javacript ahas something called
// a Range. The range object is essentially everything that I wanted to create
// with this library.

// This function (will be called )
var getSelectionData = function(){
  // var sel = window.getSelection();
  // var range = sel.getRangeAt(0)
  var test = new MyRange();
  test.spanTagsSimple();
  //range.deleteContents()

  //selection
  // var temp = sel.anchorNode;
  // var parent = temp.parentNode;
  // return temp.nodeName;
}
