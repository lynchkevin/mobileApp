'use strict';

angular.module('myApp.restServices', ['ngResource'])
    .factory('ProjectStore', ['$resource',
        function ($resource) {
            return $resource('https://rb.volerro.com/api/project/list', {});

        }]);
/*
    .factory('Report', ['$resource',
        function ($resource) {
            return $resource('http://192.168.1.116:3000/employees/:employeeId/reports', {});
        }]);
*/