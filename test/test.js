import rule from "../src/no-dropping-i";
import TextLintTester from "textlint-tester";

const tester = new TextLintTester();
tester.run("no-dropping-i", rule, {
    valid: ["見ています", "開発しています。"],
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
        }
    ]
});
