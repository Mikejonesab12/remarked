module.exports.getLevelString = function (char, maxLv, curLv, headingString) {
	curLv = curLv || 0;
	headingString = headingString || '';

	if (curLv >= maxLv) return headingString;

	return this.getLevelString(char, maxLv, ++curLv, headingString += char);
};

module.exports.getListContext = function (node, level, firstParent) {
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

	return this.getListContext(parent, level, firstParent);
};

module.exports.isPreOrCode = function (node) {
	var parent = node.parentNode;

	if (!parent) {
		return false;
	}

	if (parent.tagName === 'PRE' || parent.tagName === 'CODE') {
		return true;
	}

	return this.isPreOrCode(parent);
};
