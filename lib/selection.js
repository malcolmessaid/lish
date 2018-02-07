// This JS file will be used to define, create, and modify the selection obeject
// I will create. I'm not sure if classes in JS work the same as in Java, but I
// want to create an individaul file for this just for the sake of orgnization.

//input should be Javascript selection object
// function MySelection() {
//   this.getSelectionData = function(){
//     var sel = window.getSelection();
//     var temp = sel.anchorNode;
//     var parent = temp.parentNode;
//     console.log(sel.toString())
//     console.log(temp.nodeName)
//     console.log(temp.baseURI)
//     console.log(parent.id)
//     return temp.nodeName;
//   }
// }






var getSelectionData = function(){
  var sel = window.getSelection();
  var temp = sel.anchorNode;
  var parent = temp.parentNode;
  console.log(sel.toString())
  console.log(temp.nodeName)
  console.log(temp.baseURI)
  console.log(parent.id)

  return temp.nodeName;
}
