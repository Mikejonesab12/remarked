const {
    getLevelString,
    getListContext,
    isPreOrCode
} = require('./helpers.js');

const heading = (text, node, level) => (getLevelString('#', level) + ' ' + text + '\n');

const lineBreak = () => '\n';

const paragraph = (text) => text + '\n\n';

const bold = (text) => '**' + text + '**';

const italics = (text) => '*' + text + '*';

const del = (text) => '~~' + text + '~~';

const horizontalRule = () => '***\n';

const listItem = (text, node) => {
    const listContext = getListContext(node);
    const listChar = (listContext.firstParent === 'UL') ? '* ' : '1. ';
    return `${getLevelString('\t', listContext.level, 1)}${listChar}${text}\n`;
}

const list = (text, node) => {
    var listContext = getListContext(node);

    if (listContext.level === 0) {
        return `${text}\n`;
    }

    return text;
}

const link = (text, node) => {
    if (text) {
        return `[${text}](${node.href}) `;
    }

    return node.href;
}

const blockquote = (text) => {
    var lineArray = text.split(/[\r?\n]/g);

    mappedLineArray = lineArray.map(line => `> ${line}`);

    return `${mappedLineArray.join('\n')}\n\n`;
}

const img = (text, node) => `![Image](${node.src})\n`;

const formatted = (text) => '```\n' + text + '\n```\n';

const text = (text, node) => {
    // Markdown escape
    if (!isPreOrCode(node)) {
        text = text.replace(/([\`*_{}[\]()#+-.!>])/g, '\\$1');
        text = text.replace(/[\s]{2,}/g, ' ');
        text = text.replace(/[\r?\n]/g, '');
    }

    return text;
}

const catchAll = (text) => text;

module.exports = {
    'H1': (text, node) => heading(text, node, 1),
    'H2': (text, node) => heading(text, node, 2),
    'H3': (text, node) => heading(text, node, 3),
    'H4': (text, node) => heading(text, node, 4),
    'H5': (text, node) => heading(text, node, 5),
    'H6': (text, node) => heading(text, node, 6),
    'P': paragraph,
    'DIV': paragraph,
    'OL': list,
    'UL': list,
    'IMG': img,
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
