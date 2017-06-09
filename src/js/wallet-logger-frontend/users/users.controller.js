wlModuleUsers.controller('UsersController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', function ($http, $routeParams, appSettings, $scope, $location) {
  var $current_ctrl = this;
  $current_ctrl.user_data = [];

  $current_ctrl.tryLogin = function () {
    var user_login = {
      username: $scope.username,
      password: $scope.password
    };
    $http.post(appSettings.api_base_url + "/users", $.param(user_login), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        console.log(response);
        $current_ctrl.users = response.data.item;
      }, function (response) {
        console.log('Error');
        console.log(response);
      });
  };
}]);