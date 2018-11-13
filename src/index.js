const colors = require('./values/colors.json');
const breakpoints = require('./values/breakpoints.json');
const defaults = require('./values/defaults.json');
const fonts = require('./values/fonts.json');

const ProcessorBuilder = require('./builder/ProcessorBuilder');
const ScssProcessor = require('./processors/ScssProcessor');
const JsProcessor = require('./processors/JsProcessor');
const CssProcessor = require('./processors/CssProcessor');
const FontsProcessor = require('./processors/FontsProcessor');

/* Generate all variables for CSS, JS, Styl, Less and Sass */
new ProcessorBuilder()
    .withFileName('index')
    .withTargetDirectory('dist')
    .withDefinitions([ 
        colors,
        breakpoints,
        defaults
    ])
    .forProcessors([ 
        ScssProcessor,
        JsProcessor,
        CssProcessor
    ])
    .build();

/* Generate all font-face properties for all fonts */
new ProcessorBuilder()
    .withFileName('fonts')
    .withDefinitions([ fonts ])
    .forProcessors([ FontsProcessor ])
    .build();