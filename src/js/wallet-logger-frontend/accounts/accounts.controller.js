wlModuleAccounts.controller('AccountsController', ['$http', '$routeParams', 'appSettings', '$scope', '$location', 'localStorageService', function ($http, $routeParams, appSettings, $scope, $location, localStorageService) {
  var $current_ctrl = this;
  $current_ctrl.current_wallet_id = $routeParams.walletId;
  $current_ctrl.message = {msgStr: false, style: false};

  $current_ctrl.init = function () {
    var token = localStorageService.get('token');
    if (null === token) {
      $location.path("/login");
    }
  };

  $current_ctrl.accounts = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $routeParams.walletId + "/accounts", {
      headers: {
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $current_ctrl.accounts = response.data.item;
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

  $current_ctrl.selected_account = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.api_base_url + "/wallets/" + $routeParams.walletId + "/accounts/" + $routeParams.accountId, {
      headers: {
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $current_ctrl.selected_account = response.data.item;
      }, function (response) {
        switch (response.status) {
          case 401:
            $location.path("/login");
            break;
          case 404:
            $location.path("/wallets/" + $current_ctrl.current_wallet_id);
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
    var new_account_data = {
      name: $scope.new_account_name
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts", $.param(new_account_data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + response.data.item.id);
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
    var account_data = {
      name: $current_ctrl.selected_account.name
    };
    $http.post(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $current_ctrl.selected_account.id, $.param(account_data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function (response) {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + response.data.item.id);
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
    $http.delete(appSettings.api_base_url + "/wallets/" + $current_ctrl.current_wallet_id + "/accounts/" + $routeParams.accountId, {
      headers: {
        'Authorization': 'bearer ' + localStorageService.get('token')
      }
    })
      .then(function () {
        $location.path("/wallets/" + $current_ctrl.current_wallet_id);
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