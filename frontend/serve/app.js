const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(
  process.env.REACT_APP_DOMEN,
  createProxyMiddleware({
    target: process.env.REACT_APP_SERVER,
    changeOrigin: true,
  }),
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(process.env);
  console.log(`Server    on ${PORT}`);
});
