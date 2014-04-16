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
    * Verify file contents
    * Simulate random network failures and verify contents are valid with MD5 hash
* More robust keys for local storage
    * Switch away from plain-old-ints
    * Play better with other libraries
    * Don't stomp on other things that might be in local storage
* Prompting the user to increase local storage space if files are too large
* Stop repeatedly reloading from localStorage
    * Should cache things in memory to avoid continually base64 decoding
* More refactoring
    * FIFO functionality should be extracted out into LocalStorageQueue.js
* Pick a DI framework
    * Move away from constructor injection
* Update events to reflect multi-file support
    * Update UI to handle new events
* Use a real UI framework
    * jQuery, Angular, etc


Work Log
--------
* 2014-04-15
    * Put Resize filter back
    * Put bandwidth metrics back in
* 2014-04-13
    * Test coverage report
    * Switched to maven as a build system
    * Refactored to allow for multiple files in upload queue
    * Got some high-level functional tests working
