const AbstractProcessor = require('./AbstractProcessor');

module.exports = class ScssProcessor extends AbstractProcessor {

    constructor() {
        super();
        
        this.fileExtension = "css";
    }

    generatePropertyString(property) {
        
        let font = property.font;
        let fontFaceString = [];

        fontFaceString.push(`\n\n/* ${font.family}-${font.weight}-${font.style} - ${font.src.local} */
@font-face {
    font-family: '${font.family}';
    font-style: ${font.style};
    font-weight: ${font.weight};
    src: local('${font.family} ${font.src.local}'), local('${font.family}-${font.src.local.replace(' ', '')}'), 
         ${font.src.formats.map(format => {
            return `url("${font.src.url}.${format}") format('${format}')`
         }).join(',\n\t\t ')};
}`);

        return fontFaceString.join('\n');
    }
    
}
