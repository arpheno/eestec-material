var cityServices = angular.module('cityServices', ['ngResource']);

cityServices.factory('City', ['$resource',
  function($resource){
    return $resource('https://eestec.net/api/cities', {pk:"@pk"}, { });
  }]);
