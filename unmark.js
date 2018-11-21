var JSDOM = require('jsdom').JSDOM,
    converters = require('./lib/converters.js');
    
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

const BLOCK_ELEMENTS = [
    'DIV',
    'HR',
    'P',
    'UL',
    'OL',
    'PRE',
    'CODE',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'ADDRESS',
    'ARTICLE',
    'SECTION',
    'HEADER',
    'BLOCKQUOTE',
    'IMG',
    'FOOTER'
];

const traverseNode = (node, result) => {
    const childNodes = Array.prototype.slice.call(node.childNodes); // converts DOM node list to js array

    const childMarkdown = childNodes.reduce((accumulatedMarkdown, childNode) => {
        return accumulatedMarkdown += traverseNode(childNode, result).markdown;
    }, '');

    if (node.nodeType === TEXT_NODE) {
        result.markdown = converters.text(node.textContent, node);
        return result;
    }

    if (node.nodeType === ELEMENT_NODE && !BLOCK_ELEMENTS.includes(node.tagName)) {
        result.markdown = (converters[node.tagName] || converters['default'])(childMarkdown, node);
    }

    if (node.nodeType === ELEMENT_NODE && BLOCK_ELEMENTS.includes(node.tagName)) {
        result.block += (converters[node.tagName] || converters['default'])(childMarkdown, node);
        result.markdown = '';
    }

    return result;
}

const Unmark = (htmlString) => {
    if(!htmlString && typeof htmlString !== 'string'){
        throw 'Missing or invalid HTML. HTML must be a string';
    }
    
    const DOM = new JSDOM(htmlString);
    const body = DOM.window.document.body;
    
    const result = traverseNode(body, {markdown: '', block: ''});
    
    return result.block.trim(); 
}

module.exports = Unmark;
