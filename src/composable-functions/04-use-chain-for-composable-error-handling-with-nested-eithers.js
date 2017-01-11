'use strict';

(function() {

    var right = function(value) {

        return {

            chain: function(fn) {

                return fn(value);

            },

            map: function(fn) {

                return right(fn(value));

            },

            fold: function(fn, fng) {

                return fng(value);

            },

            inspect: function() {

                return 'right(' + value + ')';

            }

        };

    };

    var left = function(value) {

        return {

            chain: function() {

                return left(value);

            },

            map: function() {

                return left(value);

            },

            fold: function(fn) {

                return fn(value);

            },

            inspect: function() {

                return 'left(' + value + ')';

            }

        };

    };

    var fromNullable = function(value) {

        return value ? right(value) : left();

    };

    var fs = require('fs');

    var tryCatch = function(fn) {

        try {

            return right(fn());

        } catch (e) {

            return left(e);

        }

    };

    var getUserName = function() {

        return tryCatch(function() {

            return fs.readFileSync('example.json');

        })

        .chain(function(str) {

            return tryCatch(function() {

                return JSON.parse(str);

            });

        })

        .fold(

            function() {

                return 'no such user';

            },

            function(resp) {

                return resp.user;

            });

    };

    console.log(getUserName());

}());
