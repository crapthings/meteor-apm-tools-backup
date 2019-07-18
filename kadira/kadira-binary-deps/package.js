Package.describe({
  "summary": "Binary Dependencies for Kadira",
  "version": "1.5.1",
  "git": "https://github.com/meteorhacks/kadira-binary-deps.git",
  "name": "crapthings:kadira-binary-deps"
});

Npm.depends({
  "v8-profiler-node8": "6.1.1"
});

Package.onUse(function(api) {
  configure(api);
  api.export(['KadiraBinaryDeps']);
});

Package.onTest(function(api) {
  configure(api);
  api.versionsFrom('METEOR@1.8.1');
  api.use('tinytest');
  api.add_files('test.js', 'server');
});

function configure(api) {
  api.add_files('index.js', 'server');
}
