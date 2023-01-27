// LICENSE : MIT
"use strict";
import { RuleHelper } from "textlint-rule-helper";
import { tokenize } from "kuromojin";

function isTargetWord(token) {
    return token.pos === "助詞" && token.pos_detail_1 === "接続助詞" && token.basic_form === "て";
}

function isMasuWord(token) {
    return token.pos === "助動詞" && token.pos_detail_1 === "*" && token.basic_form === "ます";
}

module.exports = function(context) {
    const helper = new RuleHelper(context);
    const { Syntax, report, getSource, RuleError } = context;
    return {
        [Syntax.Str](node) {
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            const text = getSource(node);
            return tokenize(text).then(tokens => {
                tokens.forEach((token, index) => {
                    const current = token;
                    const prev = tokens[index - 1];
                    if (!prev || !current) {
                        return;
                    }
                    if (isTargetWord(prev) && isMasuWord(current)) {
                        report(
                            node,
                            new RuleError("い抜き言葉を使用しています。", {
                                index: current.word_position - 1
                            })
                        );
                    }
                });
            });
        }
    };
};
