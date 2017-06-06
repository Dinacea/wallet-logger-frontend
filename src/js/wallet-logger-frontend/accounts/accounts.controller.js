wlModuleAccounts.controller('AccountsController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', function ($http, $routeParams, appSettings, $scope, $location) {
  var $current_ctrl = this;
  $current_ctrl.current_wallet_id = $routeParams.walletId;

  $current_ctrl.accounts = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $routeParams.walletId + "/accounts")
      .then(function (response) {
        $current_ctrl.accounts = response.data.item.reverse();
      });
  };

  $current_ctrl.selected_account = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $routeParams.walletId + "/accounts/" + $routeParams.accountId)
      .then(function (response) {
        $current_ctrl.selected_account = response.data.item;
      }, function () {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id);
      });
  };

  $current_ctrl.createItem = function () {
    var new_account_data = {
      name: $scope.new_account_name
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts", $.param(new_account_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + response.data.item.id);
      });
  };

  $current_ctrl.updateItem = function () {
    var account_data = {
      name: $current_ctrl.selected_account.name
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.selected_account.id, $.param(account_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + response.data.item.id);
      });
  };

  /*
   $current_ctrl.deleteItem = function () {
   $http.delete(appSettings.api_base_url + "/wallets/" + $routeParams.walletId)
   .then(function () {
   $location.path("/wallets");
   });
   };
   */
}]);