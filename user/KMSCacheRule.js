'use strict';

(function () {
  'use strict';
    /**
    * Service Worker Toolbox caching
    */

    var cacheVersion = '-20200417';
    var dynamicVendorCacheName = 'dynamic-vendor' + cacheVersion;
    var staticVendorCacheName = 'static-vendor' + cacheVersion;
    var staticAssetsCacheName = 'static-assets' + cacheVersion;
    var contentCacheName = 'content' + cacheVersion;
    var maxEntries = 100;


    self.importScripts('https://cdn.jsdelivr.net/npm/sw-toolbox@3.6.0/sw-toolbox.js');

    self.toolbox.options.debug = false;
    self.toolbox.options.networkTimeoutSeconds = 3;

    self.toolbox.router.get('/api/(.*)', self.toolbox.networkFirst, {
      cache: {
        name: dynamicVendorCacheName,
        maxEntries: maxEntries
      }
    });

    self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
        origin: /(cdn\.jsdelivr\.net)/,
        cache: {
          name: staticAssetsCacheName,
          maxEntries: maxEntries
        }
    });

    self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
      origin: /(\.sinaimg\.cn)/,
      cache: {
        name: contentCacheName,
        maxEntries: maxEntries
      }
    });

    self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
        origin: /(cdn\.v2ex\.com)/,
        cache: {
          name: staticVendorCacheName,
          maxEntries: maxEntries
        }
    });

    // immediately activate this serviceworker
    self.addEventListener('install', function (event) {
        return event.waitUntil(self.skipWaiting());
    });

    self.addEventListener('activate', function (event) {
        return event.waitUntil(self.clients.claim());
    }); 

})();