const fileHandler = require('../utils/fileHandler');
const generateHtml = require('../utils/htmlGenerator');
const path = require('path');
const express = require('express');

const downloadLog = []; // In-memory log array

function setupRoutes(app) {
  const PUBLIC_DIR = path.join(__dirname, '../../public');
  const STATIC_DIR = path.join(__dirname, '../../static');

  app.use('/static', express.static(STATIC_DIR));

  app.get('/', (req, res) => {
    try {
      const files = fileHandler.getDirectoryListing(PUBLIC_DIR);
      const fileList = files.map(file => {
        if (file.isDirectory) {
          return `<a href="/browse/${file.name}">${file.name}/</a>`;
        } else {
          return `<a href="/download/${file.name}">${file.name}</a>`;
        }
      });
      res.send(generateHtml.generate(fileList));
    } catch (err) {
      console.error('Error scanning directory:', err); // Log the error details
      res.status(500).send('Unable to scan directory');
    }
  });

  // Handle empty subDir case explicitly
  app.get('/browse/', (req, res) => {
    console.log(`${req.ip} Redirecting to root folder`); // Trace line
    return res.redirect('/');
  });

  app.get('/browse/:subDir*', (req, res) => {
    const subDir = req.params.subDir + req.params[0];
    console.log(`${req.ip} Navigating to subDir: ${subDir}`); // Trace line
    const fullPath = path.join(PUBLIC_DIR, subDir);
    try {
      const files = fileHandler.getDirectoryListing(PUBLIC_DIR, subDir);
      const parentDir = subDir ? path.dirname(subDir) : '';
      const fileList = [
        subDir ? `<a href="/browse/${parentDir}">../</a>` : `<a href="/">../</a>`,
        ...files.map(file => {
          if (file.isDirectory) {
            return `<a href="/browse/${subDir}/${file.name}">${file.name}/</a>`;
          } else {
            return `<a href="/download/${subDir}/${file.name}">${file.name}</a>`;
          }
        })
      ];
      res.send(generateHtml.generate(fileList));
    } catch (err) {
      console.error('Error scanning directory:', err); // Log the error details
      res.status(500).send('Unable to scan directory');
    }
  });

  app.get('/download/:subDir*', (req, res) => {
    const subDir = req.params.subDir + req.params[0];
    const filePath = path.join(PUBLIC_DIR, subDir);
    
    // Log the download details
    const logEntry = {
      timestamp: new Date().toISOString(),
      clientIp: req.ip,
      fileUrl: req.originalUrl
    };
    downloadLog.push(logEntry);
    console.log(`${req.ip} Download ${req.originalUrl}`); // Trace line

    fileHandler.downloadFile(filePath, res);
  });

  // New admin route to list download logs in a table
  app.get('/admin/', (req, res) => {
    const tableRows = downloadLog.map(log => `
      <tr>
        <td>${log.timestamp}</td>
        <td>${log.clientIp}</td>
        <td>${log.fileUrl}</td>
      </tr>
    `).join('');

    const tableHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Honung Mod Board Admin page</title>
      <link rel="stylesheet" href="/static/retro-style.css">
    </head>
    <body>
      <header>
        <h1>Admin page</h1>
      </header>
      <div class="container">
        <h2>Downloads:</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Client IP</th>
              <th>File URL</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
      <footer>
        <p>&copy; 2025 honung.pantze.se</p>
      </footer>
    </body>
    </html>
    `;

    res.send(tableHtml);
  });
}

module.exports = { setupRoutes };