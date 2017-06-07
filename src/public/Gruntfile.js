module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: true,
        sourceMap: false,
        output: {
          comments: false
        }
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/jquery-ui/jquery-ui.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-ui-date/dist/date.js',
          'bower_components/angular-route/angular-route.min.js',
          '../js/wallet-logger-frontend/wallets/wallets.module.js',
          '../js/wallet-logger-frontend/wallets/wallets.controller.js',
          '../js/wallet-logger-frontend/wallets/wallets-list.component.js',
          '../js/wallet-logger-frontend/wallets/wallet-detail.component.js',
          '../js/wallet-logger-frontend/wallets/wallet-new.component.js',
          '../js/wallet-logger-frontend/accounts/accounts.module.js',
          '../js/wallet-logger-frontend/accounts/accounts.controller.js',
          '../js/wallet-logger-frontend/accounts/accounts-list.component.js',
          '../js/wallet-logger-frontend/accounts/accounts-list-for-a-wallet.component.js',
          '../js/wallet-logger-frontend/accounts/account-detail.component.js',
          '../js/wallet-logger-frontend/accounts/account-new.component.js',
          '../js/wallet-logger-frontend/transactions/transactions.module.js',
          '../js/wallet-logger-frontend/transactions/transactions.controller.js',
          '../js/wallet-logger-frontend/transactions/transactions-list.component.js',
          '../js/wallet-logger-frontend/transactions/transactions-list-for-an-account.component.js',
          '../js/wallet-logger-frontend/transactions/transaction-detail.component.js',
          '../js/wallet-logger-frontend/transactions/transaction-new.component.js',
          '../js/wallet-logger-frontend/app.js'
        ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          nocache: true
        },
        files: {
          'css/wallet-logger-frontend.min.css': '../scss/wallet-logger-frontend.scss'
        }
      }
    }
  });


  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'sass']);
};
