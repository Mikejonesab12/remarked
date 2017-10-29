# Unmark

A simple HTML to Markdown converter. Takes HTML and produces perfectly formatted Markdown.

## Use cases

For some applications you may receive a complex HTML document with a deeply nested structure. Instead of this nested document you simply want the text in a readable format. Unmark will produce that readable text in Markdown. If you want the text back into HTML, but with less complexity and cleaned from HTML attributes like class tags, then you could use any Markdown compiler like [Marked](https://github.com/chjj/marked) to produce it.

## Setup

Install via console:  `npm install unmark`

## Usage
```javascript
    var unmark = require('unmark'),
        html = '<div><section><p>hello <strong>markdown</strong>.</p></section></div>',
        markdownOutput;

    markdownOutput = new unmark(html).markdown;
```

## Todo

* Full [Github Markdown spec](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf) compliance
