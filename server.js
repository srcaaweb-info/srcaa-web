import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static assets with extension resolution
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Redirect removed legacy routes to home
app.get(['/global-review*', '/it-solutions*', '/online-courses*'], (req, res) => {
  res.redirect(301, '/');
});

// Fallback route handler for named HTML pages
app.get('/:page', (req, res, next) => {
  const filePath = path.join(__dirname, `${req.params.page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      next();
    }
  });
});

// Root fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
