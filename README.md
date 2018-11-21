# Unmark

A simple HTML to Markdown converter. Takes HTML and produces Markdown.

## Use cases

For some applications you may receive HTML, but you simply want the text in a more readable and flattened format. Unmark will convert HTML into Markdown. If you want the text back into HTML, but with less complexity and cleaned from HTML attributes like class tags, then you could use any Markdown compiler like [Marked](https://github.com/chjj/marked) to produce it.

## Installation

Install via console:  `npm install unmark`

## Usage
```javascript
    const unmark = require('unmark');
    const html = '<div><section><p>hello <strong>markdown</strong>.</p></section></div>';

    const markdownOutput = unmark(html);
    console.log(markdownOutput);
```

## Todo

* Full [Github Markdown spec](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf) compliance
* Add tests
