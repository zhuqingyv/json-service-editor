const fs = require('fs');

class ServiceCreator {
  constructor(app, url, port) {
    this.app = app;
    this.url = url;
    this.port = port;
  };

  readJson = (path, defaultValue) => {
    try {
      const jsonString = fs.readFileSync(path, { encoding: 'utf-8' });
      return JSON.parse(jsonString);
    } catch {
      return defaultValue || {};
    };
  };

  writeJson = (value) => {
    fs.writeFileSync(this.url, JSON.stringify(value));
    return this.readJson(this.url, '{}');
  };

  create = (serviceObject) => {
    const { app } = this;
    if (!app) return;

    const updateJson = (value) => {
      return this.writeJson(value);
    };
  
    Object.keys(serviceObject).forEach((serviceKey) => {
      const { methods, handle } = serviceObject[serviceKey];
      switch(methods) {
        case 'post': {
          app.post(serviceKey, (req, res) => {
            const { body:params } = req;
            const json = this.readJson(this.url);
            handle({ req, res, params, json, updateJson });
          });
          break;
        }
        case 'get':
        default: {
          app.get(serviceKey, (req, res) => {
            const { query:params } = req;
            const json = this.readJson(this.url);
            handle({ req, res, params, json, updateJson });
          });
          break; 
        }
      }
    });
  };
};

module.exports = ServiceCreator;