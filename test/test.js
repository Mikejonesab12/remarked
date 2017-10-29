var unmark = require('../unmark.js'),
	fs = require('fs'),
	remarked,
	testHtml;

testHtml = fs.readFileSync('./test.html', 'utf8');
remarked = new unmark(testHtml);

fs.writeFileSync('./test.md',remarked.markdown, 'utf8');
