(function(){
'use strict';

  angular
      .module('starterApp', ['ngMaterial', 'avatars','ngMdIcons','ngRoute','cityControllers','cityServices'])
      .controller('AppCtrl', ['$scope','$location', 'avatarsService', '$mdSidenav', '$mdBottomSheet', '$log', function($scope,$location){
          $scope.navigation=function(tab){
              $location.url(tab);
              console.log("WTF");
          }
      }])
      .config(['$routeProvider',function($routeProvider) {
          $routeProvider.
              when('/',{
                  templateUrl:'partials/base.html'
              }).
              when('/cities',{
                  templateUrl:'partials/city-list.html'
              }).
          when('/events',{
              templateUrl:'partials/event-list.html'
          })
      }])
      .config(function($mdThemingProvider) {
          var eestec = $mdThemingProvider.extendPalette('pink', {
              '800': '333333'
          });
          $mdThemingProvider.definePalette('eestec', eestec)
          $mdThemingProvider.theme('default')
              .primaryPalette('red')
              .accentPalette("eestec",{
                  'default':'A400',
                  'hue-3':'800',
              });

      });

    /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AvatarAppController($scope, avatarsService, $mdSidenav, $mdBottomSheet, $log ) {
    var allAvatars = [ ];

    $scope.selected      = null;
    $scope.avatars       = allAvatars;
    $scope.selectAvatar  = selectAvatar;
    $scope.toggleSidenav = toggleSideNav;
    $scope.showActions   = showActions;

    loadAvatars();

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Load all available avatars
     * @param menuId
     *
     */
    function loadAvatars() {
      avatarsService
        .loadAll()
        .then( function( avatars ) {
          allAvatars = avatars;

          $scope.avatars = [].concat(avatars);
          $scope.selected = avatars[0];
        });
    }

    /**
     * Hide or Show the sideNav area
     * @param menuId
     */
    function toggleSideNav( name ) {
      $mdSidenav(name).toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectAvatar ( avatar ) {
        $scope.selected = angular.isNumber(avatar) ? $scope.avatars[avatar] : avatar;
        $scope.toggleSidenav('left');
    }

    /**
     * Show the bottom sheet
     */
    function showActions($event) {

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          template: '<md-bottom-sheet class="md-list md-has-header">' +
                      '<md-subheader>Avatar Actions</md-subheader>' +
                        '<md-list>' +
                          '<md-item ng-repeat="item in vm.items">' +
                            '<md-button ng-click="vm.performAction(item)">{{item.name}}</md-button>' +
                          '</md-item>' +
                        '</md-list>' +
                      '</md-bottom-sheet>',
          bindToController : true,
          controllerAs: "vm",
          controller: [ '$mdBottomSheet', AvatarSheetController],
          targetEvent: $event
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function AvatarSheetController( $mdBottomSheet ) {
          this.items = [
            { name: 'Share', icon: 'share' },
            { name: 'Copy', icon: 'copy' },
            { name: 'Impersonate', icon: 'impersonate' },
            { name: 'Singalong', icon: 'singalong' },
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }



})();
