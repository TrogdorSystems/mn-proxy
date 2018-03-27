require('newrelic');
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOM = require('react-dom/server');
const layout = require('./layout');
const script = require('./script');
const serviceConfig = require('../service-config.json');
const SummaryViewComponent = require('./services/SummaryView-bundle-server').default;
const axios = require('axios');
const port = process.env.PORT || 3000;

const services = {
  SummaryView: SummaryViewComponent,
};

const renderComponents = ((components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDOM.renderToString(component);
  });
});

http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    let components = renderComponents(services);
    res.end(layout(script(serviceConfig, components)));
  } else if (req.url === '/SummaryView-bundle.js') {
    const readStream = fs.createReadStream(path.join(__dirname, '../dist/SummaryView-bundle.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    readStream.pipe(res);
  } else if (req.url.startsWith('/restaurants')) {
    axios({
      method: 'get',
      url: `http://localhost:8082${req.url}`,
    }).then(response => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response.data));
    }).catch(error => {
      console.error(error);
    });
  } else if (req.url.match('.css')) {
    axios({
      method: 'get',
      url: `http://localhost:8082${req.url}`,
    }).then(response => {
      res.writeHead(200, { 'Content-Type': 'text/css' })
      res.end(response.data);
    }).catch(error => {
      console.error(error);
    });
  } else {
    res.statusCode = 404;
    res.end();
  } 
}).listen(port);

console.log(`Server running on port ${port}.`);
