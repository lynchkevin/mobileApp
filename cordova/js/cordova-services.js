'use strict';
//  a service to access cordova library devices (geo, camnera, etc)
angular.module('myApp.cordovaServices', [])
   .factory('CordovaReady', function() {
        return function (fn) {

            var queue = [];

            var impl = function () {
                queue.push(Array.prototype.slice.call(arguments));
            };

            document.addEventListener('deviceready', function () {
                queue.forEach(function (args) {
                    fn.apply(this, args);
                });
                impl = fn;
            }, false);

            return function () {
                return impl.apply(this, arguments);
            };
        };
    })

    .factory('CordovaGeo', function ($rootScope, CordovaReady) {
    // this function calls the native Geo Loc Services on the Phone
        // first check to see if mobileDevice is defined - if not - test for mobile device
        if(angular.isUndefined($rootScope.mobileDevice)){
            var mobileDevice = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
            $rootScope.mobileDevice = mobileDevice;  
        }
        //if not mobile device then don't wait for "deviceready"
        if(!$rootScope.mobileDevice) {      
            return { getCurrentPosition : function (onSuccess, onError, options) {
                navigator.geolocation.getCurrentPosition(function () {
                    var that = this,
                    args = arguments;

                    if (onSuccess) {
                        $rootScope.$apply(function () {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function () {
                    var that = this,
                    args = arguments;

                    if (onError) {
                        $rootScope.$apply(function () {
                        onError.apply(that, args);
                        });
                    }
                },options);
                }
            };
        } else {
            // wrap the cordova call in a deviceready wrapper...
            return { getCurrentPosition: CordovaReady(function (onSuccess, onError, options) {
                navigator.geolocation.getCurrentPosition(function () {
                    var that = this,
                    args = arguments;

                    if (onSuccess) {
                        $rootScope.$apply(function () {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function () {
                    var that = this,
                    args = arguments;

                    if (onError) {
                        $rootScope.$apply(function () {
                        onError.apply(that, args);
                        });
                    }
                },options);
                })
            };
        }       
    });


 /*an old test function we don't need anymore..
        .factory('Geolocation', [
            function () {
                return {
                    currentPosition: function () {
                        return {lat:'123', lon:'456'};
                    }
                }

            }])
*/