define([
     'angular'
    ,'angularResource'
    ,'angularRoute'
    ,'angularLocale'
    ,'uiBootstrap'
    ,'uiTemplates'
    ,'shortcut'
    ,'controllers/controllers'
    ,'directives/directives'
    ,'filters/filters'
    ,'services/services'
]
    ,function(angular){
        'use strict';
        return angular.module('app',['ngResource','ngRoute','ui.bootstrap','ui.bootstrap.tpls','frAngular','ngLocale','controllers',
            'directives','filters','services'])

})