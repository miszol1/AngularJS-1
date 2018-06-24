angular.
  module('planApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/classrooms', {
          template: '<classroom-list></classroom-list>'
        }).
        when('/classrooms/:classroomId', {
          template: '<classroom-details></classroom-details>'
        }).
        when('/plan/', {
          template: '<plan-list></plan-list>'
        }).
        otherwise('/plan');
    }
  ]);
  