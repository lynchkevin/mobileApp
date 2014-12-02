'use strict';

angular.module('myApp.restServices', ['ngResource'])
    //get a list of all the projects - use cacheing on the http request
    .factory('ProjectStore', ['$resource',
        function ($resource) {
            return $resource('https://rb.volerro.com/api/project/list', {},{get:{method:'GET', cache: true}});

        }])
    // this is a cache for the tree structure that needs to be built from flat API data
    .factory('TreeCache',['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('treeCache');
    }])

    // get project related data
    .factory('Project', ['$resource',
        function ($resource) {
            return $resource('https://rb.volerro.com/api/project/get', {});

        }])

    // get project related data
    .factory('Board', ['$resource',
        function ($resource) {
            var baseUrl = 'https://rb.volerro.com/api/board';
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
            var baseUrl = 'https://rb.volerro.com/api/content';
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

        }]);
/*
    .factory('Report', ['$resource',
        function ($resource) {
            return $resource('http://192.168.1.116:3000/employees/:employeeId/reports', {});
        }]);
*/