const fs = require('fs');
const https = require('https');
const path = require('path');
const privateKey  = fs.readFileSync(path.join(__dirname, './key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './cert.pem'), 'utf8');
const credentials = {key: privateKey, cert: certificate};
const cors = require('cors');
const express = require('express');
const app = express();
const { Observable } = require('rxjs');
const getPuns = require('./getPuns');
const suggestKeywords = require('./suggestKeywords');

app.use(cors());

app.get('/suggest-keywords', (req, res) => {
  const q = req.query.q;
  const keywords = suggestKeywords(q);
  res.send(keywords);
});

app.get('/puns', (req, res) => {
  const keywords = req.query.q ? req.query.q.split(',') : null;
  const puns = getPuns(keywords);
  res.send(puns); 
});


const httpsServer = https.createServer(credentials, app);

httpsServer.listen(4201);