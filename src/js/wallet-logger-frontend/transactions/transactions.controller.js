wlModuleTransactions.controller('TransactionsController', function TransactionsController($http) {
  var $current_ctrl = this;

  $current_ctrl.transactions = [];
  $current_ctrl.selected_transaction = null;

  $current_ctrl.getItems = function () {
    $http.get("http://localhost:9999/wallets/3/accounts/10/transactions")
      .then(function (response) {
        $current_ctrl.transactions = response.data.item;
      });
  };

  $current_ctrl.getItem = function () {
    $http.get("http://localhost:9999/wallets/3/accounts/10/transactions/2")
      .then(function (response) {
        $current_ctrl.selected_transaction = response.data.item;
      });
  };
});