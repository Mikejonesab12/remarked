var JSDOM = require('jsdom').JSDOM,
    Converters = require('./lib/converters.js');

function Remarked(){

}

Remarked.prototype.convert = function (html){
    if(typeof html !== 'string') throw 'HTML must be a string.';

    this.DOM = new JSDOM(html);
    this.body = this.DOM.window.document.body;

    this.nodes = this.flattenDom(this.body, []);
    this.build(this.nodes);
    
    return this.body.innerMD;
};

Remarked.prototype.build = function (nodes){
    var self = this,
        text = '';

    nodes.forEach(function (node){
        var text;

        if (node.nodeType === 1){
            text = '';
            node.childNodes.forEach(function(child){
                text += child.innerMD;
            });
            node.innerMD = (self.converters[node.tagName] || self.converters['default'])(text, node);
        }

        if (node.nodeType === 3) {
            node.innerMD = node.textContent;
        }
    });
};

Remarked.prototype.flattenDom = function (node, nodes){
    var self = this;
    nodes.unshift(node);

    node.childNodes.forEach(function (child){
        self.flattenDom(child, nodes);
    });

    return nodes;
};

Converters(Remarked);

module.exports = Remarked;
