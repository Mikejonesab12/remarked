const fs = require('fs');
const path = require('path');
const unmark = require('../unmark.js');

const testHtml = fs.readFileSync(path.join(__dirname, './demo.html'), 'utf8');
const markdown = unmark(testHtml);

fs.writeFileSync(path.join(__dirname, 'demo.md'), markdown, 'utf8');
