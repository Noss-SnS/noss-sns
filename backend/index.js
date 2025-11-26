/**
 * Backend server (Express)
 * - Endpoint: POST /generate
 * - Calls local inference server at http://localhost:8000/generate (expected)
 * - If inference server not reachable, falls back to template-based generator.
 *
 * To run:
 *   cd backend
 *   npm install
 *   node index.js
 */

const express = require('express');
const fetch = require('node-fetch');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;
const INFERENCE_URL = 'http://localhost:8000/generate'; // expected local inference server

function buildPrompt(spec) {
  return `Create a complete static website project (HTML,CSS, optionally JS) for the following spec:
Title: ${spec.title}
Type: ${spec.type}
Colors: ${spec.colors}
Description: ${spec.desc}

Provide the result as JSON with fields: html (main HTML), css (styles), assets (list of {path, data_base64}).
Only return JSON.`;
}

function simpleFallbackHtml(spec) {
  const colors = (spec.colors || '#0ea5a4,#ffffff').split(',');
  const accent = colors[0] || '#0ea5a4';
  const bg = colors[1] || '#ffffff';
  return `<!doctype html>
<html lang="ar">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${spec.title}</title>
<link rel="stylesheet" href="styles.css">
</head>
<body style="background:${bg};">
  <header style="background:${accent};padding:24px;color:#fff">
    <h1>${spec.title}</h1>
  </header>
  <main style="padding:24px">
    <p>${spec.desc || 'وصف الموقع'}</p>
    <a href="#" style="display:inline-block;margin-top:12px;padding:8px 12px;background:#111;color:#fff;border-radius:8px">اتصل الآن</a>
  </main>
  <footer style="padding:12px;text-align:center;border-top:1px solid #eee">مولد المواقع بالذكاء الاصطناعي - Demo</footer>
</body>
</html>`;
}

function simpleFallbackCss(spec) {
  const colors = (spec.colors || '#0ea5a4,#ffffff').split(',');
  const accent = colors[0] || '#0ea5a4';
  return `body{font-family:system-ui,Segoe UI,Roboto,"Noto Sans",sans-serif;margin:0}header{box-shadow:0 4px 20px rgba(0,0,0,0.06)}a{text-decoration:none}`;
}

app.post('/generate', async (req, res) => {
  const spec = req.body || {};
  // try local inference
  try {
    const prompt = buildPrompt(spec);
    const r = await fetch(INFERENCE_URL, {
      method: 'POST',
      body: JSON.stringify({ prompt, max_tokens: 2000 }),
      headers: {'Content-Type':'application/json'}
    });
    if (!r.ok) throw new Error('inference server returned ' + r.status);
    const j = await r.json();
    // expected j = { html, css, assets: [] }
    const html = j.html || simpleFallbackHtml(spec);
    const css = j.css || simpleFallbackCss(spec);
    // package into zip
    const jobId = Date.now();
    const outPath = path.join(__dirname, '..', 'generated');
    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);
    const zipPath = path.join(outPath, `site_${jobId}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip');
    output.on('close', () => {
      const zipUrl = `http://localhost:${PORT}/download/${path.basename(zipPath)}`;
      const previewUrl = `http://localhost:${PORT}/preview/${path.basename(zipPath).replace('.zip','')}`;
      res.json({ zip_url: zipUrl, preview_url: previewUrl });
    });
    archive.on('error', err => { throw err; });
    archive.pipe(output);
    archive.append(html, { name: 'index.html' });
    archive.append(css, { name: 'styles.css' });
    // add assets if provided
    if (Array.isArray(j.assets)) {
      for (const a of j.assets) {
        // expect {path, data_base64}
        if (a.path && a.data_base64) {
          const buf = Buffer.from(a.data_base64, 'base64');
          archive.append(buf, { name: a.path });
        }
      }
    }
    archive.finalize();
  } catch (err) {
    console.error('Inference failed, using fallback', err.message);
    // fallback simple site packaged
    const html = simpleFallbackHtml(spec);
    const css = simpleFallbackCss(spec);
    const jobId = Date.now();
    const outPath = path.join(__dirname, '..', 'generated');
    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);
    const zipPath = path.join(outPath, `site_${jobId}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip');
    output.on('close', () => {
      const zipUrl = `http://localhost:${PORT}/download/${path.basename(zipPath)}`;
      const previewUrl = `http://localhost:${PORT}/preview/${path.basename(zipPath).replace('.zip','')}`;
      res.json({ zip_url: zipUrl, preview_url: previewUrl });
    });
    archive.on('error', err => { throw err; });
    archive.pipe(output);
    archive.append(html, { name: 'index.html' });
    archive.append(css, { name: 'styles.css' });
    archive.finalize();
  }
});

// serve generated zips
app.use('/download', express.static(path.join(__dirname, '..', 'generated')));

// simple preview route - extracts index.html from zip-like filename (for demo we return index directly)
app.get('/preview/:id', (req, res) => {
  // preview uses generated file by name pattern site_<timestamp>.zip => index.html in generated folder
  const id = req.params.id;
  const zipName = `site_${id}.zip`;
  const zipPath = path.join(__dirname, '..', 'generated', zipName);
  // if exists, read zip and extract index.html - for simplicity, attempt to read same-named folder (not extracting)
  // fallback: return a small HTML pointing to the zip download
  if (fs.existsSync(zipPath)) {
    res.send(`<html><body><p>Preview is not extracted in demo. <a href="/download/${zipName}">تحميل ZIP</a></p></body></html>`);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, () => {
  console.log('Backend running on http://localhost:' + PORT);
});
