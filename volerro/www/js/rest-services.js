'use strict';

//var rootUrl = 'https://rb.volerro.com';
var rootUrl = 'http://localhost:8080';

angular.module('myApp.restServices', ['ngResource'])
    //get a list of all the projects - use cacheing on the http request
    .factory('ProjectStore', ['$resource',
        function ($resource) {
            return $resource( rootUrl + '/api/project/list', { 'archived' : true },{get:{method:'GET', cache: true}});

        }])
    // this is a cache for the tree structure that needs to be built from flat API data
    .factory('TreeCache',['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('treeCache');
    }])

    // get project related data
    .factory('Project', ['$resource',
        function ($resource) {
            return $resource( rootUrl + '/api/project/get', {});

        }])

    // get project related data
    .factory('Board', ['$resource',
        function ($resource) {
            var baseUrl = rootUrl + '/api/board';
            return $resource(baseUrl, {}, {
                get:    { method:'GET',
                        url: baseUrl+'/get/',
                        isArray:false
                        },
                save:   { method:'GET',
                        url: baseUrl+'/get/'
                        },
                query: { method:'GET',
                        url:baseUrl+'/list/',
                        isArray:false
                       }
            });

        }])
    // get Content related data
    .factory('Content', ['$resource',
        function ($resource) {
            var baseUrl = rootUrl + '/api/content';
            return $resource(baseUrl, {}, {
                get:    { method:'GET',
                        url: baseUrl+'/get/',
                        isArray:false
                        },
                save:   { method:'GET',
                        url: baseUrl+'/get/'
                        },
                query: { method:'GET',
                        url:baseUrl+'/list/',
                        isArray:false
                       },
                view: { method:'GET',
                        url:baseUrl+'/view/',
                        isArray:false
                       }
            });

        }])
//login service
    .factory('Login', ['$http','$q',
        function (http, $q) {
            var isAuthenticated = false;
            var credentials = {};
            return { tryCredentials : function (username, password) {
                    var deferred = $q.defer();
                        http({
                            method: 'GET',
                                url: rootUrl + '/log/in',
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
