# *lish*
This repo holds the code for the Javascript library *lish*.

This library has simple functionality. In the context of  a chrome extension, *lish* allows developers to wrap selections with tags. It also hashes the content of the selection and makes that a class of the span tags. This is trivial if the selection is within just one tag, but it is more difficult if the selection spans multiple tags—this is where *lish* becomes useful.

#### Getting Started

There are more files in this repository than those that need to be downloaded for *lish* to be used. The only file that you need is the [selection.js](lib/selection.js) file the lib folder. Put that into your extentsion as a content script and and call the function 'getSelectionData' through a context menu to use the library.

## Contributing

If you are interested in contributing please address an issue and see the contributing guidelines, [CONTRIBUTING.md](CONTRIBUTING.md), for more details.

## Code of Conduct

For more information, see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

This project uses the MIT license. See the [LICENSE](LICENSE) for more information.


## Naming

The name *lish* comes from the last name of the famous literary editor Gordan Lish. This project has to do with editing the DOM, and he went to the same high-school as I did.

## Authors

* **M. Malcolm Essaid**
