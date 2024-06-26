const express = require('express');
const path = require('path');

const serveStatic = (resource) => {
    const resourcePath = path.join(__dirname, '../views');
    const option = { index: `${resource}.html` };
    return express.static(resourcePath, option);
}

module.exports = serveStatic;