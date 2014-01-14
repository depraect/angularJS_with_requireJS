define([
'app',
'controllers/inicioCtrl',
'controllers/rootCtrl'
],function(app){
    'use strict';
        
    app.config(function($routeProvider, $httpProvider){

        $httpProvider.responseInterceptors.push(function($q, $rootScope) {
            return function(promise) {
                return promise.then(function(response) {
                    return response;

                }, function(response) {
                    switch (response.status){
                        case 403 : window.location.href="login.php"; break;
                        case 404 : console.log("no se encontro la ruta"); break;
                        case 500 : console.log('Internal Server Error'); break;
                    }
                    $rootScope.$broadcast('error', response.data) ;
                    return $q.reject(response);
                });
            }

        })
        
        $routeProvider.when('/',{
            templateUrl : 'views/inicio.html',
            controller : 'inicioCtrl'
        })

        $routeProvider.when('forbidden',{
            template : '<h1>No tiene autorizacion para acceder al recurso soliciado</h1>'
        })

        $routeProvider.otherwise({redirectTo: '/'});

    })
})