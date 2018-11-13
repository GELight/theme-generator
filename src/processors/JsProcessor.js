const AbstractProcessor = require('./AbstractProcessor');

module.exports = class ScssProcessor extends AbstractProcessor {

    constructor() {
        super();

        this.fileExtension = "js";
        this.variableSymbol = "export const ";
        this.variableSeparator = " = ";
    }

    generatePropertyString(property) {
        
        let variable = property.variable;
        
        if (typeof variable.value === 'object') {
            return `${this.variableSymbol}${this.dashedToCamelCase(variable.name)}${this.variableSeparator}${this.dashedToCamelCase(variable.value.variable)};\n`;
        }
        
        return `${this.variableSymbol}${this.dashedToCamelCase(variable.name)}${this.variableSeparator}'${variable.value}';\n`;
        
    }

    dashedToCamelCase(dashed) {
        return dashed.replace(/-([a-z0-9])/g, function (m, w) {
            return w.toUpperCase();
        });

    }
    
}
