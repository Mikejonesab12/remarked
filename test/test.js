var Remarked = require('../remarked.js'),
	fs = require('fs'),


    remarked = new Remarked();
    testHtml = fs.readFileSync('./test.html','utf8');

	fs.writeFileSync('./test.txt',remarked.convert(testHtml), 'utf8');
