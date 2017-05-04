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
 		'BR': lineBreak,
 		'HR': horizontalRule,
 		'EM': italics,
 		'STRONG': bold,
 		'LI': listItem,
 		'text': text,
 		'default': catchAll
 	};
 };

 function heading(text, node, level) {
 	return (getLevelString('#', level) + text + '\n\n');
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

 function horizontalRule(text, node) {
 	return '\n***\n';
 }

 function listItem(text, node) {
 	var listContext = getListContext(node);
 }

 function text(text, node) {
 	text = text.replace(/[\s]*$|^[\s]*/g, '');
 	return text + '';
 }

 function catchAll(text, node) {
 	return text;
 }

 /*helper function*/
 function getLevelString(char, maxLv, curLv, headingString) {
 	curLv = curLv || 0;
 	headingString = headingString || '';

 	if (curLv >= maxLv) return headingString;

 	return getHeadingString(char, maxLv, ++curLv, headingString += char);
 }

 function getListContext(node, level, firstParent) {
 	var parent = node.parentNode;

 	level = level || 0;

 	if (parent.tagName !== 'UL' && parent.tagName !== 'OL' && parent.tagName !== 'LI') {
 		return {
 			level: level,
 			firstParent: firstParent
 		};
 	}

 	if (parent.tagName === 'UL' || parent.tagName === 'OL') {
 		level++;
 		firstParent = firstParent || parent.tagName;
 	}

 	return getListContext(parent, level, firstParent);
 }
