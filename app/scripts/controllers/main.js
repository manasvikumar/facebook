'use strict';

/**
 * @ngdoc function
 * @name facebookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the facebookApp
 */
angular.module('facebookApp')
  .controller('MainCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.fbLogin = function() {
      FB.login(function(response) {
            if (response.authResponse) {
             FB.api('/me', {fields: 'last_name, first_name, email'}, function(response) {
              $rootScope.lastname = response.last_name;
              $rootScope.firstname = response.first_name;
              $rootScope.email = response.email;

             });
      FB.api(
          "/me/feed",
          {
              "with": "location"
          },
          function (response) {
            if (response && !response.error) {
              console.log(response);
            }
          }
      );
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

     $scope.getuserinfo = function() {
       $scope.firstName = $rootScope.firstname;
       $scope.lastName = $rootScope.lastname;
       $scope.Email = $rootScope.email;

    }
      $scope.logout = function(){
    FB.logout(function(response) {
     console.log(response);
});
  }
  }

  ]);
