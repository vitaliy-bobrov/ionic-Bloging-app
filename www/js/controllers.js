angular.module('blogin.controllers', [])

.controller('LoginCtrl', ['$rootScope', '$scope', '$ionicModal', 'storage', 'User', function($rootScope, $scope, $ionicModal, storage, User) {

  var localStoragePrefix = 'blogin_';

  $scope.loginData = {};
  $scope.loginError = false;
  $rootScope.token = storage.get(localStoragePrefix + 'token') || false;
  $rootScope.userData = storage.get(localStoragePrefix + 'userData') || {};
  $rootScope.loginSuccess = false;

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.showLogin = function() {
    $scope.modal.show();
  };

  $scope.doLogout = function() {
    User.logout($rootScope.token);
    $rootScope.userData = {};
    $rootScope.token = false;
    $rootScope.loginSuccess = false;
    $scope.loginData = {};
    $scope.loginError = false;

    storage.remove(localStoragePrefix + 'token');
    storage.remove(localStoragePrefix + 'userData');
  };

  $scope.doLogin = function() {

    User.getSessionToken().then(function(data) {
      $rootScope.token = data;
    });

    User.login($scope.loginData.username, $scope.loginData.password, $rootScope.token).then(function(data) {
      $rootScope.loginSuccess = true;
      $rootScope.userData = data.user;
      $rootScope.token = data.token;
      console.log($rootScope.userData);

      storage.set(localStoragePrefix + 'token', $rootScope.token);
      storage.set(localStoragePrefix + 'userData', $rootScope.userData);

      $scope.modal.hide();
      $scope.loginError = false;
    }, function(error) {
      $scope.loginError = error.toString();
    });
  };

  $scope.loginInit = function() {
    if($rootScope.token) {
      $rootScope.loginSuccess = true;
    }
  };

  $scope.loginInit();
}])

.controller('CategoriesCtrl', ['$scope', '$ionicLoading', 'Categories', function($scope, $ionicLoading, Categories) {
  $ionicLoading.show();

  Categories.all().then(function(data) {
    $ionicLoading.hide();

    $scope.categories = data;
  });
}])

.controller('CategoryCtrl', ['$scope', '$stateParams', '$ionicLoading', 'Categories', function($scope, $stateParams, $ionicLoading, Categories) {
  $ionicLoading.show();

  Categories.get($stateParams.catId).then(function(data) {
    $ionicLoading.hide();

    $scope.articles = data;
    $scope.category = data[0];
  });
}])

.controller('ArticlesCtrl', ['$scope', '$ionicLoading', 'Articles', function($scope, $ionicLoading, Articles) {
  $ionicLoading.show();

  Articles.all().then(function(data) {
    $ionicLoading.hide();

    $scope.articles = data;
  });
}])

.controller('ArticleDetailCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicLoading', 'Articles', function($scope, $rootScope, $stateParams, $ionicLoading, Articles) {
  $ionicLoading.show();

  Articles.get($stateParams.articleId).then(function(data) {
    $ionicLoading.hide();

    $scope.article = data[0];

    $scope.comments = [];
    $scope.presentComments = (parseInt($scope.article.comment_count) > 0) ? true : false;
    $scope.showComments = $scope.presentComments;
    $scope.commentsListVisibility = false;
    $scope.commentData = {};
    $scope.showNewCommentForm = false;

    $scope.showCommentForm = function() {
      $scope.showNewCommentForm = true;
    };

    $scope.showCommentsSwitcher = function() {
      $scope.showComments = false;
      $scope.commentsListVisibility = true;
    };

    $scope.hideComments = function() {
      $scope.showComments = true;
      $scope.commentsListVisibility = false;
    };

    $scope.getComments = function() {
      if($scope.comments.length === 0) {
        $ionicLoading.show();

        Articles.getComments($scope.article.nid).then(function(data) {
          $ionicLoading.hide();

          $scope.comments = data;

          $scope.showCommentsSwitcher();
        });
      }
      else {
        $scope.showCommentsSwitcher();
      }

    };

    $scope.postComment = function() {
      $scope.commentData.uid = $rootScope.userData.uid;
      $scope.commentData.nid = $scope.article.nid;

      Articles.postComment($scope.commentData, $rootScope.token).then(function(data) {
        $scope.article.comment_count++;

        if($scope.comments.length === 0) {
          $scope.getComments();
        }
        else {
          $scope.comments.unshift({
            picture: $rootScope.userData.picture.url,
            name: $rootScope.userData.name,
            subject: $scope.commentData.subject,
            comment_body: $scope.commentData.comment_body.und[0].value
          });

          $scope.showCommentsSwitcher();
        }

        $scope.commentData = {};
        $scope.showNewCommentForm = false;
      });
    };

  });
}]);

