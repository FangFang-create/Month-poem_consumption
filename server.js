const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3458;

http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).slice(1);
  const contentTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    svg: 'image/svg+xml',
    woff: 'font/woff',
    woff2: 'font/woff2'
  };
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end(); }
    else { res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' }); res.end(data); }
  });
}).listen(port, () => console.log(`Server running on port ${port}`));
