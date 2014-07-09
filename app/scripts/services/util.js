/*global purl */

'use strict';

/**
 * @ngdoc service
 * @name LinkboardApp.Util
 * @description
 * # Util
 * Service in the LinkboardApp.
 */
angular.module('LinkboardApp')
  .service('util', function Util() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.timewindows = [
      { name: 'lasthour', timewindow: 3600000 },
      { name: 'lastday', timewindow: 86400000 }
    ];

    this.prettyUrl = function (u) {
      try {
        var parsed = purl(u);

        return parsed.attr('host')
          + ' '
          + parsed.attr('path')
            .replace(/\//g, ' ')
        ;
      } catch (ex) {
        return u.split('/')
          .filter(function (t) {
            return (t && (t.length > 1) && (t.length < 100));
          })
          .join(' ')
          .replace(/.*?:/, '')
          .replace(/%[\w\n]+/g, ' ')
          .replace(/[\?,=,_,~]/g, ' ')
          .replace(/.htm/, '')
        ;
      }
    };

    this.prettyTime = function (t) {
      return moment(t).fromNow();
    }

  });
