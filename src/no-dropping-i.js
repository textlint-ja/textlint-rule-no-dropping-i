// LICENSE : MIT
"use strict";
const { RuleHelper } = require("textlint-rule-helper");
const kuromojin = require("kuromojin");

function isTargetWord(token) {
    return token.pos == "助詞" && token.pos_detail_1 == "接続助詞" && token.basic_form == "て";
}

function isMasuWord(token) {
    return token.pos == "助動詞" && token.pos_detail_1 == "*" && token.basic_form == "ます";
}

module.exports = function(context) {
    const helper = new RuleHelper(context);
    let { Syntax, report, getSource, RuleError } = context;
    return {
        [Syntax.Str](node) {
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            let text = getSource(node);
            return kuromojin.tokenize(text).then(tokens => {
                tokens.reduce((prev, current) => {
                    if (isTargetWord(prev) && isMasuWord(current)) {
                        report(
                            node,
                            new RuleError("い抜き言葉を使用しています。", {
                                index: current.word_position - 1
                            })
                        );
                    }
                    return current;
                });
            });
        }
    };
};
