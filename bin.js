#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

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
  const targetName = '.json-service.json';
  const commandRoot = path.resolve('./');
  const optionFilePath = `${commandRoot}/${targetName}`;
  return readJson(optionFilePath, { port: 3000 });
};

const { url, port = 3000 } = getOption(); 

const app = express();

app.use(express.static('./', []));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

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