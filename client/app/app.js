import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import restangular from 'restangular';
import localStorageModule from 'angular-local-storage';
import 'normalize.css';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    restangular,
    localStorageModule
  ])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  }).config((RestangularProvider) => {
    "ngInject";
    RestangularProvider.setBaseUrl(API_URL);
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Allow-Control-Allow-Origin': '*'
    });

    RestangularProvider.setResponseExtractor(function (response, operation) {
        return response.data;
    });

})
    .config(['localStorageServiceProvider', (localStorageServiceProvider) => {
        localStorageServiceProvider
            .setPrefix('crossover')
            .setStorageType('localStorage')
            .setNotify(true, true)
            .setStorageCookieDomain('localhost')
            .setStorageCookie(45, '/', false);
    }])

  .component('app', AppComponent);
