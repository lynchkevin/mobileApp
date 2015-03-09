'use strict';

/**
 * @ngdoc overview
 * @name barebonesApp
 * @description
 * # barebonesApp
 *
 * Main module of the application.
 */

angular
    .module('barebonesApp', ['ngResource','ngRoute'])
    .constant("baseUrl",{"endpoint": "http://192.168.1.116:3000"})
    .config(function ($routeProvider) {
    $routeProvider
      .when('/cal', {
        templateUrl: 'views/calendar.html',
        controller: 'MainCtrl'
      })
      .when('/slides', {
        templateUrl: 'views/slides.html',
        controller: 'SlideCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtlr'
      })
      .when('/buttons', {
        templateUrl: 'views/buttons.html',
      })      
      .when('/pub', {
        templateUrl: 'views/pubnub.html',
        controller: 'pubnubCtrl'
      })
      .when('/view', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl'
      })
      .when('/top', {
        templateUrl: 'views/top.html'
      })
      .when('/vid', {
        templateUrl: 'views/video.html'
      })      
      .when('/pres', {
        templateUrl: 'views/presentations.html',
        controller: 'presentationCtlr'
      })
      .otherwise({
        redirectTo: '/pres'
      });
  });

