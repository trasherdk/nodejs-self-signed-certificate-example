#!/usr/bin/env node
'use strict';

var https = require('https')
  , port = process.argv[2] || 8043
  , fs = require('fs')
  , path = require('path')
  , server
  , options
  ;

require('ssl-root-cas')
  .inject()
  .addFile(path.join(__dirname, 'certs', 'server', 'my-root-ca.crt.pem'))
  ;

options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'privkey.pem'))
// You don't need to specify `ca`, it's done by `ssl-root-cas`
//, ca: [ fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-root-ca.crt.pem'))]
, cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'fullchain.pem'))
};


function app(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, encrypted world!');
}

server = https.createServer(options, app).listen(port, function () {
  port = server.address().port;
  console.log('Listening on https://127.0.0.1:' + port);
  console.log('Listening on https://' + server.address().address + ':' + port);
  console.log('Listening on https://localhost.daplie.com:' + port);
});
