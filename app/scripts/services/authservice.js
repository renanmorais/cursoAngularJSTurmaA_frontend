'use strict';

/**
 * @ngdoc service
 * @name chetApp.AuthService
 * @description
 * # AuthService
 * Service in the chetApp.
 */
angular.module('chetApp')
  .service('AuthService', function ($http, $location) {

    var self = this;

    this.isLoggedIn = function(request)
    {
      self.request = request;
      if(self.token === undefined)
      {
        $location.path('login');
      }
    };

    this.login = function(email, password)
    {
      $http
      .post('http://curso-angular-api.app/login',{email: email, password: password})
      .success(function(data)
      {
        self.token = data.token;
        $http.defaults.headers.common.Authorization = 'Basic ' + self.token;
        if(self.request !== undefined)
        {
          $location.path(self.request.attempt);
        } else {
          $location.path('/');
        }
      });
    };

    this.logout = function()
    {
      self.token = undefined;
      self.request = undefined;
      $http.defaults.headers.common.Authorization = undefined;
      $location.path('login');
    };

  });
