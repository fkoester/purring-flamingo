How to add a new (client side) dependency
===========================

1. Add via bower

        $ bower install --save foo

2. Find out the path to .js inside `bower_components` folder and add it to `paths` in `require-config.js` (without the 'bower_components' prefix and '.js' suffix):

        'foo': '/foo/foo'

3. If the dependency depends on other dependencies (like angular), add it to `shim` in same file:

        'foo':{
            deps: ['angular']
        },

4. Inject the dependency
    * If the dependency is an angular module, add it to `app.js`:
        
            define([
                //...
               'foo',
               //...
            ], function (ng) {
            
               return ng.module('app', [
                   //...
                  'fooNgModuleName',
                  //...
               ]);
            });
    * If the dependency is not an angular module, just use it were needed like that:
        
            define([
               'foo'
            ], function (foo) {
        
               // use the dependency
               foo.bar();
            });