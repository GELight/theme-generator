## Description ##

Generator for variables of different languages and preprocessors like scss, less, stylus and javascript.

## Adapt your values ##

Add, change or delete the values of the related json files:

* ./src/values/**colors.json**
* ./src/values/**fonts.json**
* ./src/values/**breakpoints.json**
* ./src/values/**fonts.json**

Than generate the color palette.

## Basic usage to generate variables ##

git clone git@github.com:GELight/theme-generator.git
```shell
npm install
# >>> now adapt all your needed values
npm run build
```

All generated files are placed in the dist folder.

NOTE: Another way to use the project in this version as a package you have to fork it.

## Example - Import the generated SASS Variables

```scss
@import "~theme-generator/dist/index.scss";

body {
  background-color: $white;
}
```

## Demo

Open the demo file to take look at the rendered font.

**Example:**

```
google-chrome src/demo/index.html
```

## Using the ProcessorBuilder

The ProcessorBuilder collects and runs all needed processors and writes all processor generated content into a processor specific file.

**Example:**

```javascript
const colors = require('./values/colors.json');
const breakpoints = require('./values/breakpoints.json');
const defaults = require('./values/defaults.json');
const fonts = require('./values/fonts.json');

const ProcessorBuilder = require('./builder/ProcessorBuilder');
const ScssProcessor = require('./processors/ScssProcessor');
const LessProcessor = require('./processors/LessProcessor');
const StylProcessor = require('./processors/StylProcessor');
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
        LessProcessor,
        StylProcessor,
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
```
**Output:**

```
File name 'index' defined.
Target directory 'dist' set.
Directory /home/mlinz/projects/ecom-backoffice-styles/dist created!
>>> File dist/index.scss created.       ... OK
>>> File dist/index.less created.       ... OK
>>> File dist/index.styl created.       ... OK
>>> File dist/index.js created.         ... OK
>>> File dist/index.css created.        ... OK
File name 'fonts' defined.
Target directory 'dist' set.
>>> File dist/fonts.css created.        ... OK
```

## Tests

```
npm run test
```