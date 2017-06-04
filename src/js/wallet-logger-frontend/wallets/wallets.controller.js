wlModuleWallets.controller('WalletsController', ['$http', '$routeParams', 'appSettings', function ($http, $routeParams, appSettings) {
  var $current_ctrl = this;

  $current_ctrl.wallets = [];
  $current_ctrl.getItems = function () {
    $http.get(appSettings.base_url + "/wallets")
      .then(function (response) {
        $current_ctrl.wallets = response.data.item;
      });
  };

  $current_ctrl.selected_wallet = null;
  $current_ctrl.getItem = function () {
    $http.get(appSettings.base_url + "/wallets/" + $routeParams.walletId)
      .then(function (response) {
        $current_ctrl.selected_wallet = response.data.item;
      });
  };
}]);