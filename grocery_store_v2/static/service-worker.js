self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('page-cache').then(cache => {
        return cache.addAll([
          '/',
          '/static/img/user_login.png',
          '/static/offline.html',
          '/static/img/test2.png',
          '/static/img/test.png',
          '/static/img/requests.jpg',
          '/static/img/register.png',
          '/static/img/products.jpg',
          '/static/img/orders.jpg',
          '/static/img/managers.jpg',
          '/static/img/banner1.jpg',
          '/static/img/banner2.jpg',
          '/static/img/banner3.jpg',
          '/static/img/banner4.jpg',
          '/static/img/categories.jpg',
          '/static/bootstrap/css/custom.css',
          '/static/bootstrap/css/bootstrap.min.css',
          '/static/img/offline.jpg',
        ]);
      })
    );
  });
  
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request).then(function(networkResponse) {
                return networkResponse;
            }).catch(function() {
                return caches.match('/static/offline.html');
            });
        })
    );
});


  