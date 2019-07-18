Package.describe({
  "summary": "CPU Profiler for Meteor (used with Kadira)",
  "version": "1.3.1",
  "git": "https://github.com/meteorhacks/kadira-profiler.git",
  "name": "crapthings:kadira-profiler"
});

Package.onUse(function(api) {
  configurePackage(api);
});

Package.onTest(function(api) {
  configurePackage(api);
  api.use([
    'tinytest',
  ], ['client', 'server']);

});

function configurePackage(api) {
  api.versionsFrom('METEOR@1.8.1');
  api.use('http');
  api.use('check');
  api.use('random');
  api.use('crapthings:kadira@2.30.3');
  api.imply('crapthings:kadira@2.30.3');
  api.use('crapthings:kadira-binary-deps@1.5.1');

  api.add_files('lib/server.js', 'server');
  api.add_files('lib/client.js', 'client');
}
