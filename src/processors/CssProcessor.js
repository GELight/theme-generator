const AbstractProcessor = require('./AbstractProcessor');

module.exports = class ScssProcessor extends AbstractProcessor {

    constructor() {
        super();

        this.fileExtension = "css";
        this.variableSymbol = "--";
        this.variableSeparator = ": ";
    }
    
    generatePropertyString(property) {
        
        let variable = property.variable;
        
        if (typeof variable.value === 'object') {
            return `${this.variableSymbol}${variable.name}${this.variableSeparator}var(${this.variableSymbol}${variable.value.variable});\n`;
        }
        
        return super.generateDefaultPropertyString(property);
        
    }

    process() {
        return `:root {${super.process()}}`;
    }

}
