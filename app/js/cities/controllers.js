var cityControllers = angular.module('cityControllers', []);

cityControllers.controller('CityListCtrl', ['$scope', 'City', function ($scope,City) {
  $scope.cities = City.query();
  $scope.getRandomSpan = function(){
    return Math.floor((Math.random()*2)+1);
  }
}]);

cityControllers.controller('CityDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }]);

