var test = require('tap').test,
    http = require('http'),
    request = require('request'),
    ecstatic = require('../');

function setup(opts) {
  return http.createServer(ecstatic(opts));
}

test('throws when custom contentType .types file does not exist', function(t) {
  t.plan(1);

  t.throws(
    setup.bind(null, {
      root: __dirname + '/public/',
      mimeTypes: 'this_file_does_not_exist.types'
    })
  );

});

test('custom contentType via .types file', function(t) {
  try {
    var server = setup({
      root: __dirname + '/public',
      'mime-types': __dirname + '/public/custom_mime_type.types'
    });
  } catch (e) {
    t.fail(e.message);
    t.end();
  }

  t.plan(3)

  server.listen(0, function() {
    var port = server.address().port;

    request.get('http://localhost:' + port + '/custom_mime_type.opml', function(err, res, body) {
      t.ifError(err);
      t.equal(res.statusCode, 200, 'custom_mime_type.opml should be found');
      t.equal(res.headers['content-type'], 'application/foo; charset=utf-8');
      server.close(function() { t.end(); });
    });
  });
});
