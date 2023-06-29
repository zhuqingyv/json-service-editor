#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const ServiceCreator = require('./utils/ServiceCreator.js');

const readJson = (path, defaultValue) => {
  try {
    const jsonString = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(jsonString);
  } catch {
    return defaultValue || {};
  };
};

const writeJson = (path, value) => {
  fs.writeFileSync(path, JSON.stringify(value));
  return readJson(path, '{}');
};

const getOption = () => {
  // 优先js配置
  try {
    const targetName = '.json-service.js';
    const commandRoot = path.resolve('./');
    const optionFilePath = `${commandRoot}/${targetName}`;
    const _option = require(optionFilePath);
    if (_option instanceof Function) {
      return _option(); 
    };
    return _option;
  } catch {};

  // 其次是json配置
  try {
    const targetName = '.json-service.json';
    const commandRoot = path.resolve('./');
    const optionFilePath = `${commandRoot}/${targetName}`;
    return readJson(optionFilePath, { port: 3000 });
  } catch {};
};

const { url, port = 3000, service } = getOption();

const app = express();

app.use(cors());

app.all('*', () => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
});

const { create } = new ServiceCreator(app, url, port);

app.use(express.static('./', []));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

if (service) create(service);

app.get(`/get/${url}`, (req, res) => {
  const string = JSON.stringify(readJson(url, {}));
  res.send(string)
});

app.post(`/set/${url}`, (req, res) => {
  const result = writeJson(url, req.body);
  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Service listening on port ${port}`);
});