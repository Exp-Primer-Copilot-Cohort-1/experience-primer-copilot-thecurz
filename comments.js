// Create web server
// Run: node comments.js
// Test: curl -H "Content-Type: application/json" -X POST -d '{"text":"Hello, World!"}' http://localhost:3000/comments
// Test: curl -H "Content-Type: application/json" -X POST -d '{"text":"Hello, World!"}' http://localhost:3000/comments
// Test: curl http://localhost:3000/comments

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var comments = [
  { "text": "Hello, World!" },
  { "text": "Hello, World!" }
];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

  var body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });

  request.on('end', function () {

    var pathname = url.parse(request.url).pathname;
    var query = querystring.parse(url.parse(request.url).query);

    if (pathname === '/comments') {
      if (request.method === 'POST') {
        var comment = JSON.parse(body);
        comments.push(comment);
        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(comment));
      } else if (request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(comments));
      } else {
        response.writeHead(404);
        response.end();
      }
    } else {
      response.writeHead(404);
      response.end();
    }
  });

});

// Listen on port 3000, IP defaults to