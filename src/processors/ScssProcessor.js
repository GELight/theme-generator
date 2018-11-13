const AbstractProcessor = require('./AbstractProcessor');

module.exports = class ScssProcessor extends AbstractProcessor {

    constructor() {
        super();
        
        this.fileExtension = "scss";
        this.variableSymbol = "$";
        this.variableSeparator = ": ";
    }
    
}
