angular.module('blogin.services', [])

.factory('User', ['$http', '$q', function($http, $q) {

  //Endpoints Variables.
  var loginEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/user/login',
      logoutEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/user/logout',
      sessionTokenEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=services/session/token';

  return {

    /*
     * Get services session token.
     */
    getSessionToken: function() {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : sessionTokenEndpoint,
        dataType  : 'text',
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    },

    /*
     * Login User with username and password.
     */
    login: function(username, password, token) {
      var defer = $q.defer();

      $http({
        method    : 'POST',
        url       : loginEndpoint,
        dataType  : 'json',
        data: {
          username: username,
          password: password
        },
        headers: {
          'X-CSRF-Token': token,
        }
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    },

    /*
     * Logout User.
     */
    logout: function(token) {
      var defer = $q.defer();

      $http({
        method    : 'post',
        url       : logoutEndpoint,
        dataType  : 'json',
        headers: {
          'X-CSRF-Token': token,
        }
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    }
  }
}])

.factory('Categories', ['$http', '$q', function($http, $q) {

  //Endpoints Variables.
  var categoriesEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/categories',
      categoryEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/category/';

  return {

     /*
     * Return All Categories.
     */
    all: function() {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : categoriesEndpoint,
        dataType  : 'json'
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    },

    /*
     * Return Category by ID.
     */
    get: function(catId) {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : categoryEndpoint + catId,
        dataType  : 'json'
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    }
  }
}])

.factory('Articles', ['$http', '$q', function($http, $q) {

  //Endpoints Variables.
  var blogEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/articles',
      articleEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/article/',
      commentsEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/comments/',
      postCommentEndpoint = 'http://bobrovdevdev.devcloud.acquia-sites.com/?q=api/comment';

  return {

     /*
     * Return All Articles.
     */
    all: function() {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : blogEndpoint,
        dataType  : 'json'
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    },

    /*
     * Return Article by ID.
     */
    get: function(articleId) {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : articleEndpoint + articleId,
        dataType  : 'json'
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    },

    /*
     * Return Comments by Article ID.
     */
    getComments: function(articleId) {
      var defer = $q.defer();

      $http({
        method    : 'GET',
        url       : commentsEndpoint + articleId,
        dataType  : 'json'
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    },

     /*
     * Post Comment to the article.
     */
    postComment: function(commentData, token) {
      var defer = $q.defer();

      $http({
        method    : 'POST',
        url       : postCommentEndpoint,
        dataType  : 'json',
        data      : commentData,
        headers: {
          'X-CSRF-Token': token,
        }
      })
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(data);
      });

      return defer.promise;
    }
  }
}]);
