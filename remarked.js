var JSDOM = require('jsdom');

function Remarked(){

}

Remarked.prototype.convert = function (html){
    if(typeof html !== 'string') throw 'HTML must be a string.';

    this.DOM = new jsdom.JSDOM(html);
    this.nodes = this.flattenDom(this.DOM.window.document.body, []);
    console.log(this.nodes);
};

Remarked.prototype.flattenDom = function (node, nodes){
    var self = this;
    nodes.unshift(node);

    node.childNodes.forEach(function (el){
        self.flattenDom(el);
    });

    return nodes;
};
