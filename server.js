const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Store visitor IPs in memory
const visitorIPs = new Set();

// Middleware to capture and log visitor IP
app.use((req, res, next) => {
  const visitorIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  visitorIPs.add(visitorIP);
  next();
});

// Route to fetch visitor IPs
app.get('/visitors', (req, res) => {
  res.json(Array.from(visitorIPs));
});

// Serve static files (for frontend)
app.use(express.static('public'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
