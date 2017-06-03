var wlfApp = angular.module('walletLogger', [
  'wallets',
  'accounts',
  'transactions'
]);

wlfApp.constant('mainSettings', {
  base_url: 'http://localhost:9999'
});