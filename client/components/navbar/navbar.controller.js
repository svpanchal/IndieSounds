'use strict';

angular.module('indiesoundsApp')
    .controller('NavbarCtrl', function($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Home',
            'link': 'main'
        }, {
            'title': 'Listen to music',
            'link': 'soundcloud'
        }];


        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        if($scope.isLoggedIn()) {
          $scope.profile = Auth.getCurrentUser().myProfile;
          Auth.getCurrentUser().$promise.then(function(currentUser) {
          $scope.profile = currentUser.myProfile;
          console.log('$scope.userid is: ' + JSON.stringify($scope.userid));
        });
        } 

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };
        $scope.profileSettings = function() {
            $location.path('/profiles/edit/' + $scope.profile);
            console.log('This is current user: ' + $scope.userid);
        };


        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
