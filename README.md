js-upload-manager
=================

A JavaScript upload manager with auto-resume. For when it absolutely has to get there!


Upload manager is a class intended to allow persistent uploading of files from JavaScript
to a web server:

1. When a user selects a file, it gets loaded immediately into local storage
2. A daemon polls local storage, and if it finds a file, it begins uploading it to the server in chunks
3. Chunks by default are 20KB, and if a chunk fails to upload, it will be retried
4. Upload status is also stored in local storage
5. If the server goes down, or the client loses connection, the upload will resume ASAP
6. If the user navigates away from the page, the upload will resume when they return

This is most useful for mobile web apps, where a connection might be intermittent or slow.


TODO:
-----
* More and better tests
    * true unit tests
    * higher coverage
    * Verify file contents
    * Simulate random network failures and verify contents are valid with MD5 hash
* More robust keys for local storage
    * Switch away from plain-old-ints
    * Play better with other libraries
    * Don't stomp on other things that might be in local storage
* Prompting the user to increase local storage space if files are too large
* Grunt build
    * Tired of hitting "refresh" in Jasmine
* Stop repeatedly reloading from localStorage
    * Should cache things in memory to avoid continually base64 decoding
* Test coverage report
* More refactoring
    * FIFO functionality should be extracted out into LocalStorageQueue.js
* Hook up support for filters
    * ResizeFiler.js for reducing image size
* Put bandwidth metrics back in
* Pick a DI framework
    * Move away from constructor injection
* Update events to reflect multi-file support
    * Update UI to handle new events
* Use a real UI framework
    * jQuery, Angular, etc


Work Log
--------
* 2014-04-13
    * Refactored to allow for multiple files in upload queue
    * Got some high-level functional tests working
