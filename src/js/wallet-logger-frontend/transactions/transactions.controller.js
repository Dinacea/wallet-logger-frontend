wlModuleTransactions.controller('TransactionsController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', '$filter', 'localStorageService', function ($http, $routeParams, appSettings, $scope, $location, $filter, localStorageService) {
  var $current_ctrl = this;
  $current_ctrl.current_wallet_id = $routeParams.walletId;
  $current_ctrl.current_account_id = $routeParams.accountId;
  $current_ctrl.message = {msgStr: false, style: false};

  $current_ctrl.init = function () {
    var token = localStorageService.get('token');
    if (null === token) {
      $location.path("/login");
    }
  };

  $current_ctrl.transactions = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions", {
      headers: {
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $current_ctrl.transactions = response.data.item;
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

  $current_ctrl.selected_transaction = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + $routeParams.transactionId, {
      headers: {
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $current_ctrl.selected_transaction = response.data.item;
        $current_ctrl.selected_transaction.transaction_date = $current_ctrl.Date($current_ctrl.selected_transaction.transaction_date);
      }, function (response) {
        switch (response.status) {
          case 401:
            $location.path("/login");
            break;
          case 404:
            $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id);
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
    var new_transaction_data = {
      transaction_date: $current_ctrl.dateTime($scope.new_transaction_transaction_date),
      description: $scope.new_transaction_description,
      direction: $scope.new_transaction_direction,
      amount: $scope.new_transaction_amount
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions", $.param(new_transaction_data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + response.data.item.id);
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
    var transaction_data = {
      transaction_date: $current_ctrl.dateTime($current_ctrl.selected_transaction.transaction_date),
      description: $current_ctrl.selected_transaction.description,
      direction: $current_ctrl.selected_transaction.direction,
      amount: $current_ctrl.selected_transaction.amount
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + $current_ctrl.selected_transaction.id, $.param(transaction_data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + response.data.item.id);
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

  $current_ctrl.Date = function (date) {
    return new Date(date);
  };

  $current_ctrl.dateTime = function (dateObj) {
    dateObj.setHours(4); // Fix timezone
    return dateObj.toISOString().replace(/T/, ' ').replace(/\.000Z/, '');
  };

  $scope.dateOptions = {
    changeYear: true,
    changeMonth: true,
    yearRange: '1900:-0',
    dateFormat: 'dd/mm/yy'
  };


  $current_ctrl.deleteItem = function () {
    $http.delete(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id + "/transactions/" + $routeParams.transactionId, {
      headers: {
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function () {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.current_account_id);
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