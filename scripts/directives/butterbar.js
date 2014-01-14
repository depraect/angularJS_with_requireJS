define(['directives/directives'],function(directives){
    'use strict';

    directives.directive('butterbar',function($rootScope){

        return {
            link : function(scope, element, attr){
                

                element.addClass('hide');

                $rootScope.$on('$routeChangeStart', function(){
                    element.removeClass('hide');
                })

                $rootScope.$on('httpStart', function(){
                    element.removeClass('hide');
                })

                $rootScope.$on('httpStop', function(){
                    element.addClass('hide');
                })

                $rootScope.$on('$routeChangeSuccess', function(){
                    element.addClass('hide');
                })

            }
        }

    })





})