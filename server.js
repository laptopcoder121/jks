const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Store visitor IPs in memory
const visitorData = [];

// Middleware to capture IP
app.use((req, res, next) => {
  const visitorIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!visitorData.some(data => data.ip === visitorIP)) {
    visitorData.push({ ip: visitorIP, name: `Visitor ${visitorData.length + 1}` });
  }
  next();
});

// Route to get visitor IPs
app.get('/visitors', (req, res) => {
  res.json(visitorData);
});

// Serve the frontend (static files)
app.use(express.static('public'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
