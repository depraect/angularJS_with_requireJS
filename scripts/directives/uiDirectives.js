define(['directives/directives'],function(directives){
    'use strict';
    directives.directive('uiKeydown', function ($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr.uiKeydown);
            element.on('keydown', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        };
    });

    directives.directive('uiEnterkey', function ($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr.uiEnterkey);
            element.on('keydown', function(event) {
                var key = (event.wich) ? event.wich : event.keyCode;
                if(key==13){
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                }
            });
        };
    });

    directives.directive('uiKeyup', function ($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr.uiKeyup);
            element.on('keyup', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        };
    });

    directives.directive('uiPreventdefault', function () {
        return function(scope, element, attr) {
            element.on('keydown', function(event) {
                var key = (event.wich) ? event.wich : event.keyCode;
                if(key == 13){
                    event.preventDefault();
                }
            });
        };
    });

    directives.directive('uiFocus', function () {
        return function(scope, element, attr) {
            element[0].focus();
        };
    });


    directives.directive('uiDecimalmask', function () {
        return function(scope, element, attr) {

            var mask = attr.uiDecimalmask;

            if (!mask || !mask.match){
                throw 'Provide some mask to decimalMask plugin please.';
            }

            var
                v,
                is = (function(){v = mask.match(/[0-9]{1,}/); return v!== null ? v[0].length : 0})(),
                ds = (function(){v = mask.match(/[0-9]{1,}$/); return v !== null ? v[0].length : 0})(),
                sep = (function(){v = mask.match(/,|\./); return v !== null ? v[0] : null})(),
                matcher = null,
                tester = null,
                events = /.*MSIE 8.*|.*MSIE 7.*|.*MSIE 6.*|.*MSIE 5.*/.test(navigator.userAgent) ? 'keyup propertychange paste' : 'input paste';

            if (sep === null){
                tester = new RegExp('^[0-9]{0,'+is+'}$');
                matcher = new RegExp('[0-9]{0,'+is+'}','g');
            }else{
                tester = new RegExp('^[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'[0-9]{0,'+ds+'}$|^[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'$|^[0-9]{0,'+is+'}$');
                matcher = new RegExp('[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'[0-9]{0,'+ds+'}|[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'|[0-9]{0,'+is+'}','g');
            }

            function handler(e){
                var self = element
                if (self.val() !== e.data.ov){
                    if (!tester.test(self.val())){
                        var r = self.val().match(matcher);
                        self.val(r === null ? '' : r[0]);
                    }
                    ov = e.data.ov = self.val();
                }
            }

            element
                .attr('maxlength', (is + ds + (sep === null ? 0 : 1)))
                .val(element.val().replace('.',sep))
                .bind(events,{ov:element.val()},handler);

        };
    });

    directives.directive('uiSelstart', function () {
        return function(scope, element, attr) {

            element.on('focus',function(){
                setSelectionRange(element[0], 0, element.val().length);
            })

            function setSelectionRange(inputEl, selStart, selEnd) {

                if (inputEl.setSelectionRange) {
                    inputEl.focus();
                    inputEl.setSelectionRange(selStart, selEnd);
                } else if (inputEl.createTextRange) {
                    var range = inputEl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', selEnd);
                    range.moveStart('character', selStart);
                    range.select();
                }
            }
        };
    });


    directives.directive('uiFullscreen', function () {
        return function(scope, element, attr) {


            (function() {
                var
                    fullScreenApi = {
                        supportsFullScreen: false,
                        isFullScreen: function() { return false; },
                        requestFullScreen: function() {},
                        cancelFullScreen: function() {},
                        fullScreenEventName: '',
                        prefix: ''
                    },
                    browserPrefixes = 'webkit moz o ms khtml'.split(' ');

                // check for native support
                if (typeof document.cancelFullScreen != 'undefined') {
                    fullScreenApi.supportsFullScreen = true;
                } else {
                    // check for fullscreen support by vendor prefix
                    for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
                        fullScreenApi.prefix = browserPrefixes[i];

                        if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                            fullScreenApi.supportsFullScreen = true;

                            break;
                        }
                    }
                }

                // update methods to do something useful
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

                    fullScreenApi.isFullScreen = function() {
                        switch (this.prefix) {
                            case '':
                                return document.fullScreen;
                            case 'webkit':
                                return document.webkitIsFullScreen;
                            default:
                                return document[this.prefix + 'FullScreen'];
                        }
                    }
                    fullScreenApi.requestFullScreen = function(el) {
                        return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
                    }
                    fullScreenApi.cancelFullScreen = function(el) {
                        return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
                    }
                }

                // jQuery plugin

                if (typeof jQuery != 'undefined') {
                    jQuery.fn.requestFullScreen = function() {

                        return this.each(function() {
                            var el = jQuery(this);
                            if (fullScreenApi.supportsFullScreen) {
                                fullScreenApi.requestFullScreen(el);
                            }
                        });
                    };
                }

                // export api
                window.fullScreenApi = fullScreenApi;
            })();

            // ***  full screen **//
            var fsButton = document.getElementById(attr.id);
            var fsElement = document.documentElement;

            if (window.fullScreenApi.supportsFullScreen) {
                element.removeClass('hide');

                fsButton.addEventListener('click', function() {
                    if (fullScreenApi.isFullScreen()) {
                        window.fullScreenApi.cancelFullScreen(fsElement);
                    } else {
                        window.fullScreenApi.requestFullScreen(fsElement);
                    }

                }, true);

                /*fsElement.addEventListener(fullScreenApi.fullScreenEventName, function() {
                    var icon = angular.element(element.children()[0]);
                    var span = angular.element(element.children()[1]);
                    if (fullScreenApi.isFullScreen()) {
                        //icon.removeClass('icon-fullscreen');
                        //icon.addClass('icon-resize-small');
                        //span.text('Pantalla normal')
                    } else {
                        //icon.addClass('icon-fullscreen');
                        //icon.removeClass('icon-resize-small');
                       //span.text('Pantalla completa')
                    }
                }, true);  */

            }

        };
    });


})
