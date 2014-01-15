require.config({
    paths:{
         angular        : 'bower_components/angular/angular.min'
        ,domReady       : 'bower_components/requirejs-domready/domReady'
        ,angularResource : 'bower_components/angular-resource/angular-resource.min'
        ,angularRoute   : 'bower_components/angular-route/angular-route.min'
        ,angularLocale  : 'bower_components/angular-i18n/angular-locale_es-mx'
        ,jQuery         : 'bower_components/jquery/jquery.min'
        ,uiTemplates    : 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min'
        ,uiBootstrap    : 'bower_components/angular-bootstrap/ui-bootstrap.min'
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


