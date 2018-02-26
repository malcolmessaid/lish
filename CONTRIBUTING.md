# Guidelines for Contributing to *lish*

**The current intended functionality of this library is to wrap a Selection object in Span Tags with classes that are hashes of the selection.**

## Guidelines
* All contributions should be in the spirit of the intended functionality stated above.
* When you are changing or adding to code make sure it is in the spirit of the description of the code you are replacing or the function you are adding too.
* If you add new code or a new method, make sure you comment it well.
* Do not leave console.logs or commented-out code when you submit a pull request.
* If you are planning on making multiple pull requests please do so on different branches.
* Address Issues!


## Getting Started Contributing
* All of the changes should be made within the lib folder. All of the files in the extension folder are for testing the library. They allow the code to interact with chrome. Selection.js is where the functionality of the library comes from.
* Before you make a change, make sure you understand the purpose of the library.
* If you are looking for a change to make, address an issue.



## Testing
* I do not have unit tests written.
* To test the code you've written. Go to chrome://extensions. Click 'Load unpacked extension' and open the repo folder. Every time you make a change you'll have to reload this page to update the extension.
* Do your tests on a simple webpage at first. I have written test.html for that purpose.
* To highlight: Right click and choose the 'highlight' option. Use test.html and make sure it works highlighting any combination of those divs. It should highlight the selection Red.





For Code of Conduct, see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
