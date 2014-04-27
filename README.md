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


Setup
-----
* Use any server that supports WebDAV (IIS or Apache)
* Enable a writable WebDAV directory at /webdav1/
    * Apache instructions here: http://ubuntuguide.org/wiki/WebDAV
* Host the JavaScript and HTML files at /
* Upload!


TODO:
-----
* Dependency injection
    * Get require.js working with Jasmine
    * Use require.js map to inject dependencies to tests
* More refactoring
    * FIFO functionality should be extracted out into LocalStorageQueue.js
* More robust keys for local storage
    * Switch away from plain-old-ints
    * Play better with other libraries
    * Don't stomp on other things that might be in local storage
* Stop repeatedly reloading from localStorage
    * Should cache things in memory to avoid continually base64 decoding
* More and better tests
    * true unit tests
    * Verify file contents
    * Simulate random network failures and verify contents are valid with MD5 hash
* Prompting the user to increase local storage space if files are too large
* Update events to reflect multi-file support
    * Update UI to handle new events


Work Log
--------
* 2014-04-27
    * Added ability to list files with WebDAV
    * Tested various UI frameworks and templating engines
    * Created basic widget, binding, and event frameworks
    * Can now create folders in WebDav
    * Can delete files in WebDav
* 2014-04-20
    * Uploads working to plain-old-apache (with mod_dav)
    * Remove custom .NET project
    * Remove custom Java code
    * Remove custom PHP
    * Let Apache/IIS be the WebDav server
* 2014-04-19
    * Switched to require.js
    * Broke tests
* 2014-04-16
    * Implemented WebDav compatible Java uploading
    * .NET support
* 2014-04-15
    * Put Resize filter back
    * Put bandwidth metrics back in
* 2014-04-13
    * Test coverage report
    * Switched to maven as a build system
    * Refactored to allow for multiple files in upload queue
    * Got some high-level functional tests working
