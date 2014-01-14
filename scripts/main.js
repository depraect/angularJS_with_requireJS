require.config({
    paths:{
         angular        : 'libs/angular.min'
        ,domReady       : 'libs/domReady'
        ,angularResource : 'libs/angular-resource.min'
        ,angularRoute   : 'libs/angular-route.min'
        ,angularLocale  : 'libs/angular-locale_es-mx'
        ,jQuery         : 'libs/jquery-2.0.2.min'
        ,uiTemplates    : 'libs/ui-bootstrap/ui-bootstrap-custom-tpls-0.6.0.min'
        ,uiBootstrap    : 'libs/ui-bootstrap/ui-bootstrap-custom-0.6.0.min'
        ,shortcut       : 'libs/OpenJS-shortcut'
    }
    ,shim :{
        angular : {exports : 'angular', deps:['jQuery']},
        angularResource: {deps : ['angular']},
        angularRoute : {deps: ['angular']},
        uiTemplates : {deps:['angular']},
        uiBootstrap: {deps:['angular','uiTemplates']},
        shortcut : {deps:['angular']},
        angularLocale: {deps:['angular'],  exports : 'angularLocale'}
    }
    ,urlArgs: 'v=1.3'
})

define(['app','domReady','routes'],function(app, domReady){
    'use strict';
    domReady(function(){
        angular.bootstrap(document,['app']);
    });

})


