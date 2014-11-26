'use strict';

angular.module('myApp.geoServices', [])
        .factory('Geolocation', [
            function () {
                return {
                    currentPosition: function () {
                        return {lat:'123', lon:'456'};
                    }
                }

            }])
   .factory('cordovaReady', function() {
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
    .factory('Cordova', function ($rootScope, cordovaReady) {
    // this function calls the native Geo Loc Services on the Phone
        var fn = function (onSuccess, onError, options) {
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
                },
                options);
            };
        // Now we either return the function as an object or return the function wrapped in CordovaReady
        if(!$rootScope.mobileDevice) {
            return { getCurrentPosition : fn } ;
        } else {
            return { getCurrentPosition: cordovaReady(fn) };
        }
    });
 