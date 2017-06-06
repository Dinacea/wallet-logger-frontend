wlModuleTransactions.controller('TransactionsController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', '$filter', function ($http, $routeParams, appSettings, $scope, $location, $filter) {
  var $current_ctrl = this;
  $current_ctrl.current_wallet_id = $routeParams.walletId;
  $current_ctrl.current_account_id = $routeParams.accountId;

  $current_ctrl.transactions = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions")
      .then(function (response) {
        $current_ctrl.transactions = response.data.item;
      });
  };

  $current_ctrl.selected_transaction = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + $routeParams.transactionId)
      .then(function (response) {
        $current_ctrl.selected_transaction = response.data.item;
        $current_ctrl.selected_transaction.transaction_date = $filter('date')($current_ctrl.Date($current_ctrl.selected_transaction.transaction_date), 'dd/MM/yyyy', '+0200');
      }, function () {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id);
      });
  };

  $current_ctrl.createItem = function () {
    var new_transaction_data = {
      transaction_date: $current_ctrl.dateTime($scope.new_transaction_transaction_date),
      description: $scope.new_transaction_description,
      direction: $scope.new_transaction_direction,
      amount: $scope.new_transaction_amount
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions", $.param(new_transaction_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + response.data.item.id);
      });
  };

  $current_ctrl.updateItem = function () {
    var transaction_data = {
      transaction_date: $current_ctrl.dateTime($current_ctrl.selected_transaction.transaction_date),
      description: $current_ctrl.selected_transaction.description,
      direction: $current_ctrl.selected_transaction.direction,
      amount: $current_ctrl.selected_transaction.amount
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + $current_ctrl.selected_transaction.id, $.param(transaction_data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + response.data.item.id);
      });
  };

  $current_ctrl.Date = function(date) {
    return new Date(date);
  };

  $current_ctrl.itDate = function (date) {
    console.log(date);
    var it_date = date.split('/');
    return $current_ctrl.Date($current_ctrl.Date(it_date[1] + '/' + it_date[0] + '/' + it_date[2]));
  };

  $current_ctrl.dateTime = function (dateObj) {
    return dateObj.toISOString().replace(/T/,' ').replace(/\.000Z/,'');
  };

  $scope.dateOptions = {
    changeYear: true,
    changeMonth: true,
    yearRange: '1900:-0',
    dateFormat: 'dd/mm/yy'
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