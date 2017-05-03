var JSDOM = require('jsdom').JSDOM,
    Converters = require('./lib/converters.js');

function Remarked(){

}

Remarked.prototype.convert = function (html){
    var result;

    if(typeof html !== 'string') throw 'HTML must be a string.';

    this.DOM = new JSDOM(html);
    this.body = this.DOM.window.document.body;

    this.nodes = this.flattenDom(this.body, []);
    result = this.build(this.nodes);

    return result;
};

Remarked.prototype.build = function (nodes){
    var self = this,
        nodesArray = Array.prototype.slice.call(nodes);

    return nodesArray.reduce(function (result, node){
        var childArray = Array.prototype.slice.call(node.childNodes),
            text;

        if (node.nodeType === 3) {
            node._md = node.textContent.replace(/[\r\n\t].*?/g, '');
        }

        text = childArray.reduce(function(text, child){
            return text += child._md;
        },'');

        if (node.nodeType === 1){
            node._md = (self.converters[node.tagName] || self.converters['default'])(text, node);
        }

        return node._md;
    },'');
};

Remarked.prototype.flattenDom = function (node, nodes){
    var self = this;
    nodes.unshift(node);

    node.childNodes.forEach(function (child){
        self.flattenDom(child, nodes);
    });

    return nodes;
};

Remarked.prototype.blockElements = [
    'BODY',
    'DIV'
];

Converters(Remarked);

module.exports = Remarked;
