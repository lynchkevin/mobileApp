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
    .factory('Cordova', function ($rootScope) {
        return {
            getCurrentPosition: function (onSuccess, onError, options) {
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
            }
        };
    });