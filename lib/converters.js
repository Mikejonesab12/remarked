module.exports = function (Remarked){
	Remarked.prototype.converters = {
		'BR': lineBreak,
		'EM': italics,
		'STRONG': bold,
		'default': catchAll
	};
};

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
