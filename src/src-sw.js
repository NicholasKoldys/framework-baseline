// import { warmStrategyCache, StaleWhileRevalidate } from 'workbox-recipes';
// import { CacheFirst } from 'workbox-strategies';
// import { registerRoute } from 'workbox-routing';
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// import { ExpirationPlugin } from 'workbox-expiration';

const SW_VERSION = '0.1.0';

self.addEventListener('message', (event) => {
    if (event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage(SW_VERSION);
    }
});

// // Set up page cache
// const pageCache = new CacheFirst({
//     cacheName: 'page-cache',
//     plugins: [
//         new CacheableResponsePlugin({
//         statuses: [0, 200],
//         }),
//         new ExpirationPlugin({
//             maxAgeSeconds: 30 * 24 * 60 * 60,
//         }),
//     ],
// });


/* //clicked Resource
    caches.open("item-id").then.(cache => {
        fetch("/get?id=" + id).then(response => {
            return response.json();
        }).then(urls => {
            cache.addAll(urls);
        })
    })
*/

/* 
    workbox.routing.register Route(
        /\.(?:png|jpg|jpeg|svg)$/,
        workbox.straegies.cacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, //30days
                })
            ]
        }
    )
 */

// warmStrategyCache({
//     urls: ['/index.html', '/'],
//     strategy: pageCache,
// });

// registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// // Set up asset cache
// registerRoute(
// ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
//     new StaleWhileRevalidate({
//         cacheName: 'asset-cache',
//         plugins: [
//         new CacheableResponsePlugin({
//             statuses: [0, 200],
//         }),
//         ],
//     }),
// );
