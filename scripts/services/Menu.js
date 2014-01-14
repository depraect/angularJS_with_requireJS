define(['services/services'],function(services){
    'use strict';
    services.factory('MenuLoader',function($http,$q){

        return function() {
            /*
            var delay = $q.defer();

            $http({method: 'GET',url : '../app/menu'})
            .success(function(opciones) {
                delay.resolve(opciones)
            },function() {
                delay.reject('Unable to fetch menu');
            });
            return delay.promise;
            */
           return true;
           
        };



    })




})