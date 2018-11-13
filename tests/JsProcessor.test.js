const JsProcessor = require('../src/processors/JsProcessor');

test('Correct comment for JsProcessor generated.', () => {
    const generatedProccessorValues = new JsProcessor().add([
        {
            "comment": "Comment 1"
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('/* Comment 1 */\n');
});

test('Correct variable for JsProcessor generated.', () => {
    const generatedProccessorValues = new JsProcessor().add([
        {
            "variable": {
                "name": "test",
                "value": "#ffcc00"
            }
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('export const test = \'#ffcc00\';\n');
});

test('Correct variable with variable as value for JsProcessor generated.', () => {
    const generatedProccessorValues = new JsProcessor().add([
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
    expect(generatedProccessorValues).toMatch('export const use = test;\n');
});

test('Correct dashed variable renamed to a camelCase string for JsProcessor generated.', () => {
    const generatedProccessorValues = new JsProcessor().add([
        {
            "variable": {
                "name": "my-test-variable",
                "value": "#ffcc00"
            }
        },
        {
            "variable": {
                "name": "my-use-variable",
                "value": {
                    "variable": "my-test-variable"
                }
            }
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('export const myUseVariable = myTestVariable;\n');
});
