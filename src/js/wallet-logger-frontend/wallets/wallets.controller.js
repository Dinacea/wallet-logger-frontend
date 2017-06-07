wlModuleWallets.controller('WalletsController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', function ($http, $routeParams, appSettings, $scope, $location) {
  var $current_ctrl = this;

  $current_ctrl.wallets = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.api_base_url + "/wallets")
      .then(function (response) {
        $current_ctrl.wallets = response.data.item;
      });
  };

  $current_ctrl.selected_wallet = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $routeParams.walletId)
      .then(function (response) {
        $current_ctrl.selected_wallet = response.data.item;
      }, function () {
        $location.path("/wallets");
      });
  };

  $current_ctrl.createItem = function () {
    var new_wallet_data = {
      name: $scope.new_wallet_name
    };
    $http.post(appSettings.api_base_url + "/wallets", $.param(new_wallet_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + response.data.item.id);
      });
  };

  $current_ctrl.updateItem = function () {
    var wallet_data = {
      name: $current_ctrl.selected_wallet.name
    };
    $http.put(appSettings.api_base_url + "/wallets/" + $current_ctrl.selected_wallet.id, $.param(wallet_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + response.data.item.id);
      });
  };

  $current_ctrl.deleteItem = function () {
    $http.delete(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + $routeParams.transactionId)
      .then(function () {
        $location.path("/wallets");
      });
  };
}]);