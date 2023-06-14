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

  create = (serviceObject) => {
    const { app } = this;
    if (!app) return;
    Object.keys(serviceObject).forEach((serviceKey) => {
      const { methods, handle } = serviceObject[serviceKey];
      app[methods](serviceKey, (req, res) => {
        const { body:params } = req;
        const json = this.readJson(this.url);
        handle({ req, res, params, json });
      });
    });
  };
};

module.exports = ServiceCreator;