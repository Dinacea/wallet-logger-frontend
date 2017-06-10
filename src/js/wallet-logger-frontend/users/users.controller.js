wlModuleUsers.controller('UsersController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', 'localStorageService', function ($http, $routeParams, appSettings, $scope, $location, localStorageService) {
  var $current_ctrl = this;
  $current_ctrl.user_data = [];
  $current_ctrl.username = null;
  $current_ctrl.password = null;
  $current_ctrl.message = { msgStr: false, style: false};

  $current_ctrl.tryLogin = function () {
    var user_login = {
      username: $current_ctrl.username,
      password: $current_ctrl.password
    };
    $http.post(appSettings.api_base_url + "/login", $.param(user_login), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $current_ctrl.message = {
          msgStr: 'Welcome back ' + response.data.item.name + '!',
          style: 'success'
        };
        localStorageService.set('id', response.data.item.id);
        localStorageService.set('name', response.data.item.name);
        localStorageService.set('username', response.data.item.username);
        localStorageService.set('token', response.data.item.token);

        $location.path("/wallets");
      }, function (response) {
        switch (response.status) {
          case 401:
            $current_ctrl.message = {
              msgStr: 'Wrong username or password',
              style: 'danger'
            };
            break;
          default:
            $current_ctrl.message = {
              msgStr: 'Sorry, there\'s a problem on server, retry later please',
              style: 'warning'
            };
            break;
        }
      });
  };

  $current_ctrl.logout = function () {
    localStorageService.clearAll();
    $current_ctrl.user_data = [];
    $current_ctrl.username = null;
    $current_ctrl.password = null;
    $current_ctrl.message = { msgStr: false, style: false};
  };
}]);