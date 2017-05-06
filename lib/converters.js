var helpers = require('./helpers.js');

module.exports = function(Remarked) {
	Remarked.prototype.converters = {
		'H1': function(text, node) {
			return heading(text, node, 1);
		},
		'H2': function(text, node) {
			return heading(text, node, 2);
		},
		'H3': function(text, node) {
			return heading(text, node, 3);
		},
		'H4': function(text, node) {
			return heading(text, node, 4);
		},
		'H5': function(text, node) {
			return heading(text, node, 5);
		},
		'H6': function(text, node) {
			return heading(text, node, 6);
		},
		'P': paragraph,
		'DIV': paragraph,
		'OL': list,
		'UL': list,
		'ARTICLE': paragraph,
		'BR': lineBreak,
		'HR': horizontalRule,
		'EM': italics,
		'STRONG': bold,
		'DEL': del,
		'BLOCKQUOTE': blockquote,
		'LI': listItem,
		'A': link,
		'PRE': formatted,
		'CODE': formatted,
		'text': text,
		'default': catchAll
	};
};

function heading(text, node, level) {
	return (helpers.getLevelString('#', level) + ' ' + text + '\n');
}

function lineBreak(text, node) {
	return '\n';
}

function paragraph(text, node) {
	return text + '\n\n';
}

function bold(text, node) {
	return '**' + text + '** ';
}

function italics(text, node) {
	return '*' + text + '* ';
}

function del(text, node) {
	return '~~' + text + '~~ ';
}

function horizontalRule(text, node) {
	return '***\n';
}

function listItem(text, node) {
	var listContext = helpers.getListContext(node),
		listChar;

	listChar = (listContext.firstParent === 'UL') ? '* ' : '1. ';

	return (helpers.getLevelString('\t', listContext.level, 1) + listChar + text + '\n');
}

function list(text, node) {
	var listContext = helpers.getListContext(node);

	if (listContext.level === 0) {
		return text + '\n';
	}

	return text;
}

function link(text, node) {
	var linkTpl = '[{{text}}]({{url}}) ';

	if (text) {
		linkTpl = linkTpl.replace('{{url}}', node.href);
		linkTpl = linkTpl.replace('{{text}}', text);

		return linkTpl + ' ';
	}

	return node.href + ' ';
}

function blockquote(text, node){
	var lineArray = text.split(/[\r?\n]/g);

	lineArray = lineArray.map(function(line){
		return '> ' + line;
	});

	return lineArray.join('\n') + '\n\n';
}

function formatted(text, node) {
	return '```\n' + text + '\n```\n';
}

function text(text, node) {
	//Markdown escape
	if (!helpers.isPreOrCode(node)) {
		text = text.replace(/([\`*_{}[\]()#+-.!>])/g, '\\$1');
		text = text.replace(/[\s]{2,}/g, ' ');
		text = text.replace(/[\r?\n]/g, '');
	}

	return text;
}

function catchAll(text, node) {
	return text;
}
