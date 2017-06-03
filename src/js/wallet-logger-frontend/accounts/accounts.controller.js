wlModuleAccounts.controller('AccountsController', function AccountsController($http) {
  var $current_ctrl = this;

  $current_ctrl.accounts = [];
  $current_ctrl.selected_account = null;

  $current_ctrl.getItems = function () {
    $http.get("http://localhost:9999/wallets/3/accounts")
      .then(function (response) {
        $current_ctrl.accounts = response.data.item;
      });
  };

  $current_ctrl.getItem = function () {
    $http.get("http://localhost:9999/wallets/3/accounts/10")
      .then(function (response) {
        $current_ctrl.selected_account = response.data.item;
      });
  };
});