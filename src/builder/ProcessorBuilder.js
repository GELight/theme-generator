const fs = require('fs');
const path = require('path');

class ProcessorBuilder {

    constructor() {
        this.fileName = 'index';
        this.targetDirectory = 'dist';
        this.definitions = [];
        this.processors = [];
    }
    
    withFileName(fileName) {
        this.fileName = fileName;
        return this;
    }
    
    withTargetDirectory(targetDirectory) {
        this.targetDirectory = targetDirectory;
        return this;
    }

    withDefinitions(definitions) {
        this.definitions = [...this.definitions, ...definitions];
        return this;
    }

    forProcessors(processors) {
        this.processors = [...this.processors, ...processors];
        return this;
    }

    makeTargetDirectory(targetDir, {isRelativeToScript = false} = {}) {
        const sep = path.sep;
        const initDir = path.isAbsolute(targetDir) ? sep : '';
        const baseDir = isRelativeToScript ? __dirname : '.';
        
        targetDir.split(sep).reduce((parentDir, childDir) => {
            
            const curDir = path.resolve(baseDir, parentDir, childDir);

            if (!fs.existsSync(curDir)) {
                try {
                    if(curDir.lastIndexOf('.') == (curDir.length -1)) {
                        return null;
                    }
                    
                    fs.mkdirSync(curDir);
                    console.info(`Directory ${curDir} created!`);
                }
                catch (err) {
                    if (err.code !== 'EEXIST') {
                        throw err;
                    }
                    console.info(`Directory ${curDir} already exists!`);
                    console.error(err);
                }
            }
            
            return curDir;
        }, initDir);
        
    }

    build() {

        console.info('File name \'' + this.fileName + '\' defined.');
        console.info('Target directory \'' + this.targetDirectory + '\' set.');
        
        this.makeTargetDirectory(this.targetDirectory);
        
        if (this.processors) {
            
            this.processors.forEach(processor => {

                let processorInstance = new processor();
                for (let i = 0; i < this.definitions.length; i++) {
                    processorInstance.add(this.definitions[i]);
                }
                
                let newFileName = this.targetDirectory + '/' + this.fileName + '.' + processorInstance.fileExtension;

                try {
                    
                    const stream = fs.createWriteStream(newFileName);
                    stream.once('open', () => {
                        stream.write(processorInstance.process());
                    })
                    
                    console.info(`>>> File ${newFileName} created. \t... OK`);
                }
                catch (err) {
                    
                    if (err.code !== 'EEXIST') {
                        throw err;
                    }

                    console.error(`Error while writing file \'${newFileName}\' for \'${processorInstance.fileExtension}\' processor!`);

                }

            });
        }
        
    }

}

module.exports = ProcessorBuilder;
