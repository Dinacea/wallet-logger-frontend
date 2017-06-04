wlModuleTransactions.controller('TransactionsController', ['$http', '$routeParams', 'appSettings', function ($http, $routeParams, appSettings) {
  var $current_ctrl = this;
  $current_ctrl.current_wallet_id = $routeParams.walletId;
  $current_ctrl.current_account_id = $routeParams.accountId;

  $current_ctrl.transactions = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.base_url + "/wallets/" + $routeParams.walletId + "/accounts/" + $routeParams.accountId + "/transactions")
      .then(function (response) {
        $current_ctrl.transactions = response.data.item;
      });
  };

  $current_ctrl.selected_transaction = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.base_url + "/wallets/" + $routeParams.walletId + "/accounts/" + $routeParams.accountId + "/transactions/" + $routeParams.transactionId)
      .then(function (response) {
        $current_ctrl.selected_transaction = response.data.item;
      });
  };
}]);