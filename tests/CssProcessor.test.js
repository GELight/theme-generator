const CssProcessor = require('../src/processors/CssProcessor');

test('Correct comment for CssProcessor generated.', () => {
    const generatedProccessorValues = new CssProcessor().add([
        {
            "comment": "Comment 1"
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('/* Comment 1 */\n');
});

test('Correct variable for CssProcessor generated.', () => {
    const generatedProccessorValues = new CssProcessor().add([
        {
            "variable": {
                "name": "test",
                "value": "#ffcc00"
            }
        }
    ]).process();
    expect(generatedProccessorValues).toMatch('--test: #ffcc00;\n');
});

test('Root element for css variable definitions available.', () => {
    const generatedProccessorValues = new CssProcessor().add([
        {
            "variable": {
                "name": "test",
                "value": "#ffcc00"
            }
        }
    ]).process();
    expect(generatedProccessorValues.trim().replace(/(\r\n\t|\n|\r\t)/gm,"")).toMatch(`:root {--test: #ffcc00;}`);
    
});

test('Root element for css variable definitions available.', () => {

    const processor = new CssProcessor();
    const generatedPropertyString = processor.generatePropertyString({
        "variable": {
            "name": "test-variable",
            "value": {
                "variable": "other-test-variable"
            }
        }
    });

    expect(generatedPropertyString.trim().replace(/(\r\n\t|\n|\r\t)/gm,"")).toMatch(`--test-variable: var(--other-test-variable);`);
    
});

test('process - without values', () => {
    
    const processor = new CssProcessor();
    expect(processor.process()).toBe(':root {}');

});
