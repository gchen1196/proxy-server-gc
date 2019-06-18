require('newrelic');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, '../public')));

let proxy = require('http-proxy').createProxyServer();

let serverOne = 'http://localhost:3001';

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.get('/api/restaurants/:id/photos', (req, res) => {
  const { id } = req.params;
  res.redirect(`http://3.88.8.197:3000/api/restaurants/${id}/photos`);
})

app.get('/api/restaurants/:id/reviews', (req,res) => proxy.web(req, res, { target: serverOne }));
// app.get('/api/restaurants/:id/reviews', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://localhost:3001/api/restaurants/${id}/reviews`);
// })

app.get('/api/restaurants/:pricesearch&:location', (req,res) => proxy.web(req, res, { target: serverOne }));
// app.get('/api/restaurants/:pricesearch&:location', (req, res) => {
//   const { pricesearch } = req.params;
//   const { location } = req.params;
//   res.redirect(`http://localhost:3001/api/restaurants/${pricesearch}&${location}`);
// })

app.get('/api/restaurants/:name', (req,res) => proxy.web(req, res, { target: serverOne }));
// app.get('/api/restaurants/:name', (req, res) => {
//   const { name } = req.params;
//   res.redirect(`http://localhost:3001/api/restaurants/${name}`);
// })

app.get('/api/restaurants/:location/location', (req,res) => proxy.web(req, res, { target: serverOne }));
// app.get('/api/restaurants/:location/location', (req, res) => {
//   const { location } = req.params;
//   res.redirect(`http://localhost:3001/api/restaurants/${location}/location`);
// })

app.get('/api/restaurants/:id/info', (req, res) => {
  const { id } = req.params;
  res.redirect(`http://3.16.165.5:3002/api/restaurants/${id}/info`);
})

app.get('/api/restaurants/:id/googlereviews', (req, res) => {
  const { id } = req.params;
  res.redirect(`http://localhost:3003/api/restaurants/${id}/googlereviews`);
})

app.listen(port, console.log('proxy server listening on port', port));
