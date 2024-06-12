const express = require('express');
const app = express();

// Logging middleware for logging requests
const reqLog = (req, res, next) => {
console.log(`${new Date().toISOString()} - ${req.method} ${req.url} w/ ${Object.keys(req.body)}`.magenta);
next();
}

module.exports = reqLog
