'use strict';

angular.module('myApp.filters', [])
    .filter('isActive', [function () {
        return function (items) {
            var filtered = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!item.archived) {
                filtered.push(item);
                }
            }   
        return filtered;
        };
}]);