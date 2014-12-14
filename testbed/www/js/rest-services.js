'use strict';

angular.module('myApp.restServices', ['ngResource'])
    .factory('ProjectStore', ['$resource',
        function ($resource) {
                        console.log("https://rb.volerro.com/api/project/list");
            return $resource('https://rb.volerro.com/api/project/list', {});

        }])

    .factory('Login', ['$http','$q',
        function (http, $q) {
            var isAuthenticated = false;
            var credentials = {};
            return { tryCredentials : function (username, password) {
                    var deferred = $q.defer();
                        http({
                            method: 'GET', 
                                url: 'https://rb.volerro.com/log/in', 
                            headers: {
                                Accept: 'Application/json, text/javascript', 
                                Authorization:'',
                                'Cache-Control':'no-cache'
                                     },
                            params : {un:username,
                                pw:password,
                                xhrSbt:'1',
                                save:'false',
                                xhr:'1'}
                        }).success(function(data,status) {
                            isAuthenticated=true;
                            credentials.username = username;
                            credentials.password = password;
                            var credString = credentials.username+':'+credentials.password;
                            var c = 'Basic '+btoa(credString);                            
                            http.defaults.headers.common.Authorization = c;        
                            deferred.resolve(data);
                        })
                        .error(function(data,status) {
                            isAuthenticated = false;
                            credentials = {};
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    authenticated : function() {
                        return isAuthenticated;
                        },
                    getCredentials : function() {
                        var c = {};
                        angular.isDefined(credentials.username) ? c=credentials : c={};
                        return c;
                        },
                    getEncoded: function() {
                        var c = '';
                        if(isAuthenticated) {
                            var credString = credentials.username+':'+credentials.password;
                            c = btoa(credString);
                        }
                        return c;
                        }
                    }
        }]);
/*
    .factory('Report', ['$resource',
        function ($resource) {
            return $resource('http://192.168.1.116:3000/employees/:employeeId/reports', {});
        }]);
*/