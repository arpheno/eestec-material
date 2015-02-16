var cityServices = angular.module('cityServices', ['ngResource']);

cityServices.factory('City', ['$resource',
  function($resource){
    return $resource('http://localhost:8000/api/cities', {pk:"@pk"}, { });
  }]);
