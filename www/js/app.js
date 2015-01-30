angular.module('blogin', ['ionic', 'ngCordova', 'angularLocalStorage', 'blogin.controllers', 'blogin.services'])

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.constant('$ionicLoadingConfig', {
  template: 'Loading...',
  animation: 'fade-in'
})

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.categories', {
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })
    .state('tab.category', {
      url: '/category/:catId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category.html',
          controller: 'CategoryCtrl'
        }
      }
    })
    .state('tab.category_article', {
      url: '/category/article/:articleId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/article-detail.html',
          controller: 'ArticleDetailCtrl'
        }
      }
    })
  .state('tab.articles', {
      url: '/articles',
      views: {
        'tab-articles': {
          templateUrl: 'templates/tab-articles.html',
          controller: 'ArticlesCtrl'
        }
      }
    })
    .state('tab.article-detail', {
      url: '/articles/:articleId',
      views: {
        'tab-articles': {
          templateUrl: 'templates/article-detail.html',
          controller: 'ArticleDetailCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/articles');

}]);
