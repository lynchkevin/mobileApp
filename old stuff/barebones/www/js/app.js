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
  .module('barebonesApp', [
    'ngResource',
    'ngRoute'
  ])
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
      .otherwise({
        redirectTo: '/slides'
      });
  });
