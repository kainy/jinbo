'use strict';

angular.module('JinboApp')
  .filter('strToDate', function () {
    return function (input) {
      return new Date(input);
    };
  });
