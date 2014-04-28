/*
 * js-upload-manager
 * https://github.com/bgard6977/js-upload-manager/
 *
 * Copyright (c) 2014 Brent Gardner
 * Licensed under the MIT license.
 */
define([
    'utils/PathUtil'
], function (PathUtil) {
    describe('PathUtil', function () {

        it('should get parent paths', function () {
            expect(PathUtil.getParentPath('')).toEqual('/');
            expect(PathUtil.getParentPath('/')).toEqual('/');
            expect(PathUtil.getParentPath('/a')).toEqual('/');
            expect(PathUtil.getParentPath('/a/')).toEqual('/');
            expect(PathUtil.getParentPath('/a/b')).toEqual('/a/');
            expect(PathUtil.getParentPath('/a/b/')).toEqual('/a/');
        });

    });
});
