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

1. Tests
2. Multiple files in local storage at one time
3. Prompting the user to increase local storage space if files are too large
