wlfApp.controller('WalletsController', function WalletsController($scope, $http) {
  $scope.wallets = [];

  this.getItems = function () {
    $http.get("http://localhost:9999/wallets")
      .then(function (response) {
        $scope.wallets = response.data.item;
      });
   };

   this.getItems();
});
