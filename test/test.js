import rule from "../src/no-dropping-i";
import TextLintTester from "textlint-tester";

const tester = new TextLintTester();
tester.run("no-dropping-i", rule, {
    valid: [
        "見ています",
        "開発しています。",
        "休んでいました。",
        "笑っている。",
        "見学している。",
        "遊んでいる。",
        "勉強していない。",
        "困っていません。"
    ],
    invalid: [
        {
            text: "見てます。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 3
                }
            ]
        },
        {
            text: "開発してます。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 5
                }
            ]
        },
        {
            text: "休んでました。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            text: "笑ってる。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 3
                }
            ]
        },
        {
            text: "見学してる。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            text: "遊んでる。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 3
                }
            ]
        },
        {
            text: "勉強してない。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            text: "困ってません。",
            errors: [
                {
                    message: "い抜き言葉を使用しています。",
                    line: 1,
                    column: 4
                }
            ]
        },
    ]
});
