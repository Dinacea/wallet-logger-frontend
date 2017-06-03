wlModuleWallets.controller('WalletsController', function WalletsController($http) {
  var $current_ctrl = this;

  $current_ctrl.wallets = [];
  $current_ctrl.selected_wallet = null;

  $current_ctrl.getItems = function () {
    $http.get("http://localhost:9999/wallets")
      .then(function (response) {
        $current_ctrl.wallets = response.data.item;
      });
  };

  $current_ctrl.getItem = function () {
    $http.get("http://localhost:9999/wallets/3")
      .then(function (response) {
        $current_ctrl.selected_wallet = response.data.item;
      });
  };
});