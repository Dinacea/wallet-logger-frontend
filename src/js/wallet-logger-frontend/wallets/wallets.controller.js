wlModuleWallets.controller('WalletsController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', 'localStorageService', function ($http, $routeParams, appSettings, $scope, $location, localStorageService) {
  var $current_ctrl = this;
  $current_ctrl.wallets = [];
  $current_ctrl.message = { msgStr: false, style: false};

  $current_ctrl.getItems = function () {
    $http({
        url: appSettings.api_base_url + "/wallets",
        method: 'GET',
        headers: {
          'Authorization': 'bearer ' + localStorageService.get('token')
        }
    })
      .then(function (response) {
        $current_ctrl.wallets = response.data.item;
      }, function (response) {
        switch (response.status) {
          case 401:
            console.log(response);
            $location.path("/login");
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

  $current_ctrl.selected_wallet = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $routeParams.walletId)
      .then(function (response) {
        $current_ctrl.selected_wallet = response.data.item;
      }, function (response) {
        switch (response.status) {
          case 401:
            $location.path("/login");
            break;
          case 404:
            $location.path("/wallets");
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

  $current_ctrl.createItem = function () {
    var new_wallet_data = {
      name: $scope.new_wallet_name
    };
    $http.post(appSettings.api_base_url + "/wallets", $.param(new_wallet_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + response.data.item.id);
      }, function (response) {
        switch (response.status) {
          case 401:
            $location.path("/login");
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

  $current_ctrl.updateItem = function () {
    var wallet_data = {
      name: $current_ctrl.selected_wallet.name
    };
    $http.put(appSettings.api_base_url + "/wallets/" + $current_ctrl.selected_wallet.id, $.param(wallet_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + response.data.item.id);
      }, function (response) {
        switch (response.status) {
          case 401:
            $location.path("/login");
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

  $current_ctrl.deleteItem = function () {
    $http.delete(appSettings.api_base_url + "/wallets/" + $routeParams.walletId)
      .then(function () {
        $location.path("/wallets");
      }, function (response) {
        switch (response.status) {
          case 401:
            $location.path("/login");
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
}]);