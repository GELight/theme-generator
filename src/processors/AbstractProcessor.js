module.exports = class AbstractProcessor {

    constructor() {
        
        if (new.target === AbstractProcessor) {
            throw new TypeError("Cannot construct Abstract instances directly!");
        }
        
        this.values = [];

        this.generatedString = "";

        this.fileExtension = null;
        this.variableSymbol = null;
        this.variableSeparator = null;
    }

    add(values) {
        this.values.push(values);
        return this;
    }

    generateDefaultPropertyString(property) {
        return `${this.variableSymbol}${property.variable.name}${this.variableSeparator}${property.variable.value};\n`;
    }

    generatePropertyString(property) {
        
        let variable = property.variable;
        
        if (typeof variable.value === 'object') {
            return `${this.variableSymbol}${variable.name}${this.variableSeparator}${this.variableSymbol}${variable.value.variable};\n`;
        }

        return this.generateDefaultPropertyString(property);

    }

    process() {

        if (this.values.length) {
            
            this.values.forEach(valueArray => {
                
                valueArray.forEach(value => {
                    if (value.comment) {
                        this.generatedString += `\n/* ${value.comment} */\n\n`;
                    } else {
                        this.generatedString += this.generatePropertyString(value);
                    }
                });

            });

        }
        
        return this.generatedString;
    }

}
