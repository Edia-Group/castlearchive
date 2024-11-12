const express = require('express');
const path = require('path');
const app = express();

app.use(
  express.static(path.join(__dirname, 'build'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
      if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
      if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html');
    },
  })
);

app.listen(7001, () => console.log('Admin frontend running on port 7001'));
