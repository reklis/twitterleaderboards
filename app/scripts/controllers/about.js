'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.contactInfo = {
      twitterhandle: 'sfusco',
      githubrepo: 'https://github.com/reklis/twitterleaderboards'
    };

    $scope.steps = [
      { icon: 'user', text: 'Login with Twitter' },
      { icon: 'bookmark', text: 'Mark domains you want to watch' },
      { icon: 'dashboard', text: 'Links shared on twitter are detected, counted and ranked' },
      { icon: 'heart', text: 'Discover new stuff to love :)' }
    ];

    $scope.services = [
      { href: 'https://twitter.com/twitter', name: 'twitter' },
      { href: 'https://twitter.com/awscloud', name: 'amazon aws' },
      { href: 'https://twitter.com/heroku', name: 'heroku' },
      { href: 'https://twitter.com/googlecloud', name: 'google app engine' },
      { href: 'https://twitter.com/mongohq', name: 'mongohq' },
      { href: 'https://twitter.com/mongolab', name: 'mongolab' },
      { href: 'https://twitter.com/RedisLabsInc', name: 'redis labs' },
      { href: 'https://twitter.com/redistogo', name: 'redis to go' },
      { href: 'https://twitter.com/github', name: 'github' }
    ];
  })
;
