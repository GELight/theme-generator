const ScssProcessor = require('./../src/processors/ScssProcessor');

test('Correct comment for ScssProcessor generated.', () => {
    const generatedProccessorValues = new ScssProcessor().add([
        {
            "comment": "Comment 1"
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('/* Comment 1 */\n');
});

test('Correct variable for ScssProcessor generated.', () => {
    const generatedProccessorValues = new ScssProcessor().add([
        {
            "variable": {
                "name": "test",
                "value": "#ffcc00"
            }
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('$test: #ffcc00;\n');
});

test('Correct variable with variable as value for ScssProcessor generated.', () => {
    const generatedProccessorValues = new ScssProcessor().add([
        {
            "variable": {
                "name": "test",
                "value": "#ffcc00"
            }
        },
        {
            "variable": {
                "name": "use",
                "value": {
                    "variable": "test"
                }
            }
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('$use: $test;\n');
});
