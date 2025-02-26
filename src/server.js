const express = require('express');
const path = require('path');
const { setupRoutes } = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 8787;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Setup routes
setupRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});