var _ = require('underscore');
var assert = require('assert');
var DDPClient = require('ddp');
var Client = require('../../lib/client.js');

suite('Client', function () {
  suite('constructor', function () {
    test('inherit from ddp', function () {
      var mock = _.extend(Client.prototype);
      Client.call(Client.prototype, {url: 'http://localhost:5000', stats: 's'});
      assert.equal(mock.ddpVersion, 1);
    });

    test('additional fields', function () {
      var mock = _.extend(Client.prototype);
      var opts = {url: 'http://localhost:5000', stats: 's'};
      Client.call(mock, opts);
      assert.equal(mock.options, opts);
      assert.equal(mock.stats, opts.stats);
      assert.equal(mock._currentUser, null);
    });
  });

  suite('method call', function () {
    test('validate arguments', function () {
      var mock = {_call: Function.prototype};
      assert.throws(function () {
        Client.prototype.call.call(mock);
      });
      assert.doesNotThrow(function () {
        Client.prototype.call.call(mock, 'x');
      });
    });

    test('without callback')

    test('with callback')

    test('with arguments')
  });

  suite('subscription', function () {
    test('validate arguments', function () {
      var mock = {_subscribe: Function.prototype};
      assert.throws(function () {
        Client.prototype.subscribe.call(mock);
      });
      assert.doesNotThrow(function () {
        Client.prototype.subscribe.call(mock, 'x');
      });
    });

    test('without callback')

    test('with callback')

    test('with arguments')
  });

  suite('_urlToDDPOptions', function() {
    test('http url with port specified', function() {
      var url = "http://somehost:3000";
      var ddpOptions = Client.prototype._urlToDDPOptions(url);
      assert.deepEqual(ddpOptions, {
        path: "",
        host: "somehost",
        port: 3000,
        use_ssl: false
      });
    });

    test('https url with port specified', function() {
      var url = "https://somehost:3000";
      var ddpOptions = Client.prototype._urlToDDPOptions(url);
      assert.deepEqual(ddpOptions, {
        path: "",
        host: "somehost",
        port: 3000,
        use_ssl: true
      });
    });

    test('http url without port specified', function() {
      var url = "http://somehost";
      var ddpOptions = Client.prototype._urlToDDPOptions(url);
      assert.deepEqual(ddpOptions, {
        path: "",
        host: "somehost",
        port: 80,
        use_ssl: false
      });
    });

    test('https url without port specified', function() {
      var url = "https://somehost";
      var ddpOptions = Client.prototype._urlToDDPOptions(url);
      assert.deepEqual(ddpOptions, {
        path: "",
        host: "somehost",
        port: 443,
        use_ssl: true
      });
    });
  });

  suite('user information', function () {
    test('get user info', function () {
      var mock = {_currentUser: Math.random()};
      var user = Client.prototype.user.call(mock);
      assert.equal(user, mock._currentUser);
    });

    test('get userId', function () {
      var mock = {_currentUser: {_id: Math.random()}};
      var userId = Client.prototype.userId.call(mock);
      assert.equal(userId, mock._currentUser._id);
    });
  });

  suite('connection', function () {
    test('connection error');
    test('test as new visitor');
    test('test as logged user');
    test('login with MeteorDown:login');
    test('kill client connection');
  });

  suite('helpers', function () {
    test('_pickRandom', function () {
      var items = [Math.random(), Math.random(), Math.random()];
      var pick = Client.prototype._pickRandom.call(null, items);
      assert.equal(items.indexOf(pick) >= 0, true);
    });

    test('_getLoginParams', function () {
      var mock = {options: {key: 'K', auth: {userIds: [1, 2, 3, 4, 5]}}};
      mock._pickRandom = function () {return 5};
      var params = Client.prototype._getLoginParams.call(mock);
      assert.deepEqual(params, ['K', {userId: 5}]);
    });
  });
});
