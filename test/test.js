var Remarked = require('../remarked.js'),
	fs = require('fs'),
	remarked,
	testHtml;

testHtml = fs.readFileSync('./test.html', 'utf8');
remarked = new Remarked(testHtml);

fs.writeFileSync('./test.txt',remarked.markdown, 'utf8');
