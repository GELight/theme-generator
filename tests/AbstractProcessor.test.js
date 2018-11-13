const AbstractProcessor = require('../src/processors/AbstractProcessor');
const CssProcessor = require('../src/processors/CssProcessor');

test('AbstractProcessor - Cannot construct Abstract instances directly', () => {
    
    expect(() => {
        new AbstractProcessor();
    }).toThrowError();
    
});
