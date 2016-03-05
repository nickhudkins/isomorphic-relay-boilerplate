#!/usr/bin/env node
"use strict";
const fork = require('child_process').fork;
const path = require('path');

const BACKEND_DIR = path.join(__dirname, 'backend');
const FRONTEND_DIR = path.join(__dirname, 'frontend');
const PROXY_DIR = path.join(__dirname, 'proxy');

const BACKEND_SCRIPT = path.join(BACKEND_DIR, 'lib');
const FRONTEND_SCRIPT = path.join(FRONTEND_DIR, 'lib/server');
const PROXY_SCRIPT = path.join(PROXY_DIR, 'lib');

const backend = fork(BACKEND_SCRIPT, { cwd: BACKEND_DIR, env: process.env });
const frontend = fork(FRONTEND_SCRIPT, { cwd: FRONTEND_DIR, env: process.env });
let proxy;

function ready(proc) {
  return new Promise(resolve => {
    proc.on('message', message => {
      if (message === 'ready') {
        resolve();
      }
    });
  });
}

Promise.all([
  ready(backend),
  ready(frontend),
]).then(() => {
  proxy = fork(PROXY_SCRIPT, { cwd: PROXY_DIR });
});

function exit() {
  backend.kill();
  frontend.kill();
  if (proxy) {
    proxy.kill();
  }

  process.exit();
}

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
