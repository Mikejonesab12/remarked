const getLevelString = (character, maxLevel, currentLevel = 0, headingString = '') => {
    if (currentLevel >= maxLevel) return headingString;
    return getLevelString(character, maxLevel, ++currentLevel, `${headingString}${character}`);
};

const getListContext = (node, level = 0, firstParent = null) => {
    var parent = node.parentNode;

    if (parent.tagName !== 'UL' && parent.tagName !== 'OL' && parent.tagName !== 'LI') {
        return {
            level: level,
            firstParent: firstParent
        };
    }

    if (parent.tagName === 'UL' || parent.tagName === 'OL') {
        level++;
        firstParent = parent.tagName;
    }

    return getListContext(parent, level, firstParent);
};

const isPreOrCode = (node) => {
    var parent = node.parentNode;

    if (!parent) {
        return false;
    }

    if (parent.tagName === 'PRE' || parent.tagName === 'CODE') {
        return true;
    }

    return isPreOrCode(parent);
};

module.exports = {
    getLevelString,
    getListContext,
    isPreOrCode
};
