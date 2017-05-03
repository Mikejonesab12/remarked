module.exports = function (Remarked){
	Remarked.prototype.converters = {
		'H1': function(text, node){return heading(text, node, 1);},
		'H2': function(text, node){return heading(text, node, 2);},
		'H3': function(text, node){return heading(text, node, 3);},
		'H4': function(text, node){return heading(text, node, 4);},
		'H5': function(text, node){return heading(text, node, 5);},
		'H6': function(text, node){return heading(text, node, 6);},
		'BR': lineBreak,
		'EM': italics,
		'STRONG': bold,
		'default': catchAll
	};
};

function heading(text, node, level){
	return (getHeadingString(level) + ' ' + text + '\n\n');
}

function lineBreak(text, node){
	return '\n';
}

function paragraph(text, node){
	return text + '\n\n';
}

function bold(text, node){
	return '**' + text + '**';
}

function italics(text, node){
	return '*' + text + '*';
}

function catchAll(text, node){
	return text;
}

function getHeadingString(maxLv, curLv, headingString){
	curLv = curLv || 0;
	headingString = headingString || '';

	if(curLv >= maxLv){
		return headingString;
	}

	headingString += '#';

	return getHeadingString(maxLv, curLv + 1, headingString);
}
