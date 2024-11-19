// LICENSE : MIT
"use strict";
import { RuleHelper } from "textlint-rule-helper";
import { tokenize } from "kuromojin";

function isMasuTargetWord(token) {
    return token.pos === "助詞" && token.pos_detail_1 === "接続助詞" && (token.basic_form === "て" || token.basic_form === "で");
}

function isMasuWord(token) {
    return token.pos === "助動詞" && token.pos_detail_1 === "*" && token.basic_form === "ます";
}

function isTeruTargetWord(token) {
    return token.pos === "動詞" && token.pos_detail_1 === "自立";
}

function isTeruWord(token) {
    return token.pos === "動詞" && token.pos_detail_1 === "非自立" && (token.basic_form === "てる" || token.basic_form === "でる");
}

function isTenaiTargetWord(token) {
    return token.pos === "動詞" && token.pos_detail_1 === "非自立" && (token.basic_form === "て" || token.basic_form === "で");
}

function isTenaiWord(token) {
    return token.pos === "助動詞" && token.conjugated_type === "特殊・ナイ" && token.basic_form === "ない";
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

                    const isMasuPattern = isMasuTargetWord(prev) && isMasuWord(current);
                    const isTeruPattern = isTeruTargetWord(prev) && isTeruWord(current);
                    const isTenaiPattern = isTenaiTargetWord(prev) && isTenaiWord(current);

                    if (isMasuPattern || isTeruPattern || isTenaiPattern) {
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
