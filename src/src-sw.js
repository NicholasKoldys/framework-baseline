// ? Claim pages on Activate
import { clientsClaim } from 'workbox-core';
// ? If precaching = unable to pre-nav
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
// ? Used to create routing strategies.
import { registerRoute } from 'workbox-routing';
// ? Used to serve specified content from the cache and update with the network behind.
import { StaleWhileRevalidate } from 'workbox-strategies';
// ? Always expire cache to reduce app size.
import { ExpirationPlugin } from 'workbox-expiration';

//? used to updated precache values, methods.
//? changing version will FORCE refresh on service worker.
const SW_VERSION = '0.1.12';
const API_ENTRY_LIST = [
    'users'
];
const SW_PRE_CACHE_MANIFEST = self.__precacheManifest;

// * IMPORTANCE : 1
clientsClaim();

// * IMPORTANCE : 2
precacheAndRoute(SW_PRE_CACHE_MANIFEST);
cleanupOutdatedCaches();

// * IMPORTANCE : 3
registerRoute(
    ({url}) => {
        API_ENTRY_LIST.includes(url.pathname.split("?")[0])
    },
    new StaleWhileRevalidate({
        cacheName: 'api',
        plugins: [
            new ExpirationPlugin({
                // Only cache requests for a week
                maxAgeSeconds: 3 * 24 * 60 * 60,
                // Only cache 10 requests.
                maxEntries: 10,
            }),
        ]
    })
);

// * NON-important message functions
self.addEventListener('message', (event) => {
    if (event.data) {
        switch (event.data.type) {
            case "SKIP_WAITING" : {
                self.skipWaiting();
                break;
            }
            case "GET_VERSION" : {
                event.ports[0].postMessage(SW_VERSION);
                break;
            }
            case "CACHE_URLS" : {
                event.ports[0].postMessage(SW_PRE_CACHE_MANIFEST);
                break;
            }
        }
    }
});