var wlfApp = angular.module('walletLogger', [
  'ngRoute',

  'wallets',
  'accounts',
  'transactions'
]);

wlfApp.constant('appSettings', {
  api_base_url: 'http://localhost:9999'
});

wlfApp.config(['$locationProvider', '$routeProvider',
  function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        redirectTo: '/wallets'
      })
      .when('/wallets', {
        template: '<wallets-list></wallets-list>'
      })
      .when('/wallets/new', {
        template: '<wallet-new></wallet-new>'
      })
      .when('/wallets/:walletId', {
        template: '<wallet-detail></wallet-detail>' + '<accounts-list-for-a-wallet></accounts-list-for-a-wallet>'
      })
      .when('/wallets/:walletId/accounts', {
        template: '<accounts-list></accounts-list>'
      })
      .when('/wallets/:walletId/accounts/new', {
        template: '<account-new></account-new>'
      })
      .when('/wallets/:walletId/accounts/:accountId', {
        template: '<account-detail></account-detail>' + '<transactions-list-for-an-account></transactions-list-for-an-account>'
      })
      .when('/wallets/:walletId/accounts/:accountId/transactions', {
        template: '<transactions-list></transactions-list>'
      })
      .when('/wallets/:walletId/accounts/:accountId/transactions/new', {
        template: '<transaction-new></transaction-new>'
      })
      .when('/wallets/:walletId/accounts/:accountId/transactions/:transactionId', {
        template: '<transaction-detail></transaction-detail>'
      })
      .otherwise('/error');
  }
]);

wlfApp.filter('euroFormat', function () {
  return function (value) {
    return value.toFixed(2).replace(/\./, ',').replace(/./g, function(c, i, a) {
      return i && c !== "," && ((a.length - i) % 3 === 0) ? '.' + c : c;
    });
  }
});