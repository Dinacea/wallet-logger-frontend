wlModuleAccounts.controller('AccountsController', ['$http', '$routeParams', 'appSettings', function ($http, $routeParams, appSettings) {
  var $current_ctrl = this;
  $current_ctrl.current_wallet_id = $routeParams.walletId;

  $current_ctrl.accounts = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.base_url + "/wallets/" + $routeParams.walletId + "/accounts")
      .then(function (response) {
        $current_ctrl.accounts = response.data.item;
      });
  };

  $current_ctrl.selected_account = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.base_url + "/wallets/" + $routeParams.walletId + "/accounts/" + $routeParams.accountId)
      .then(function (response) {
        $current_ctrl.selected_account = response.data.item;
      });
  };
}]);