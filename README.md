# Remarked.js

A simple HTML to Markdown converter. Takes HTML and produces perfectly formatted Markdown.

## Use cases

For some applications you may receive a complex HTML document with a deeply nested structure. Instead of this nested document you simply want the text in a readable format. Remarked.js will produce that readable text in Markdown. If you want the text back into HTML, but with less complexity and cleaned from HTML attributes like class tags, then you could use any Markdown compiler like [Marked](https://github.com/chjj/marked) to produce it.

## Setup

At the moment Remarked.js is only available on Node. A browser compatible version is coming soon.

Install via console:  `npm install remarked.js`

## Usage
```javascript
    var Remarked = require('remarked'),
        html = '<div><section><p>hello <strong>markdown</strong>.</p></section></div>',
        markdownOutput;

    markdownOutput = new Remarked(html).markdown;
```

## Markdown Syntax References:

* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
* https://daringfireball.net/projects/markdown/syntax

Output was verified with this [Markdown Editor](http://dillinger.io/)

## Todo

* Add more robust testing
* Make compatible for the browser
* Full [Github Markdown spec](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf) compliance
* Port to Python

## About

Version 1.0.0
Last updated 5/6/2017
