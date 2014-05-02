require.config({
    paths: {
        jquery: 'lib/jquery'
    }
});
require([
    'widgets/WebDavBrowser'
], function (WebDavBrowser) {

    window.exports = window.exports || {};

    // Create a WebDav client and bind a DataGrid to it
    var browser = new WebDavBrowser('/webdav1/');
    $('.webDavBrowser').append(browser.getElement());

});
