define(['controllers/controllers','directives/butterbar'],function(controllers){
    'use strict';
    controllers.controller('rootCtrl',function($scope, $http, $rootScope){

        $scope.error = false;

        $scope.hideError = function(){
            $scope.error = false;
        }

        $http.defaults.transformRequest.push(function (data) {
            $rootScope.$broadcast('httpStart');
            return data;
        });
        $http.defaults.transformResponse.push(function(data){
            $rootScope.$broadcast('httpStop');
            return data;
        })

        $rootScope.$on('error',function(event,data){
            $scope.error = data.error.message;
        })

    })

})