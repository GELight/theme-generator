const fs = require('fs');
const path = require('path');

const ProcessorBuilder = require('../src/builder/ProcessorBuilder');

jest.mock("fs");
jest.mock("path");

beforeEach(() => {
});

afterEach(() => {
    
});

test('ProcessorBuilder exists.', () => {
    expect(ProcessorBuilder).toBeDefined();
});

test('ProcessorBuilder instance created correctly.', () => {
    const builder = new ProcessorBuilder();
    expect(builder).toBeDefined();
    expect(builder.fileName).toBe('index');
    expect(builder.targetDirectory).toBe('dist');
});

test('Set file name for ProcessorBuilder', () => {
    const builder = new ProcessorBuilder().withFileName('test');
    expect(builder.fileName).toBe('test');
});

test('Set target directory for ProcessorBuilder', () => {
    const builder = new ProcessorBuilder().withTargetDirectory('test');
    expect(builder.targetDirectory).toBe('test');
});

test('makeTargetDirectory - Make a target directory', () => {

    // GIVEN
    spyOn(path, "isAbsolute").and.returnValue(false);
    spyOn(path, "resolve").and.returnValue("testDirectory");
    spyOn(fs, "existsSync").and.returnValue(false);
    
    // WHEN 
    new ProcessorBuilder().makeTargetDirectory('testDirectory');
    
    // THEN
    expect(path.isAbsolute).toHaveBeenCalledWith('testDirectory');
    expect(path.sep).toBe('/');
    expect(path.resolve).toHaveBeenCalledWith('.', '', 'testDirectory');
    expect(fs.mkdirSync).toHaveBeenCalledWith('testDirectory');
    
});

test('makeTargetDirectory - Make a target directory failed', () => {

    // GIVEN
    spyOn(path, "isAbsolute").and.returnValue(false);
    spyOn(path, "resolve").and.returnValue("/testDirectory");
    spyOn(fs, "existsSync").and.returnValue(false);
    spyOn(fs, "mkdirSync").and.throwError("TEST_ERROR");
    
    // WHEN 
    const testObject = new ProcessorBuilder();
    expect(() => {
        testObject.makeTargetDirectory('testDirectory');
    }).toThrowError("TEST_ERROR");
    
});

test('makeTargetDirectory - Make a target directory failed by empty directory name', () => {

    // GIVEN

    const error = new Error();
    error.code = "TEST_ERROR";

    spyOn(path, "isAbsolute").and.returnValue(false);
    spyOn(path, "resolve").and.returnValue("");
    spyOn(fs, "existsSync").and.returnValue(false);
    spyOn(fs, "mkdirSync").and.throwError(error);
    
    // WHEN 
    new ProcessorBuilder().makeTargetDirectory("");
    
});

test('makeTargetDirectory - Make a target directory already exists', () => {

    // GIVEN

    const error = new Error();
    error.code = "EEXIST";

    spyOn(path, "isAbsolute").and.returnValue(false);
    spyOn(path, "resolve").and.returnValue("/testDirectory");
    spyOn(fs, "existsSync").and.returnValue(false);
    spyOn(fs, "mkdirSync").and.throwError(error);

    // WHEN 
    new ProcessorBuilder().makeTargetDirectory('testDirectory');

    // THEN
    expect(fs.mkdirSync).toHaveBeenCalled();

});

test('build - ProcessorBuilder - without processors', () => {

    class TestBuilder extends ProcessorBuilder {
        makeTargetDirectory(targetDir) {
            expect(targetDir).toBe('dist');
        }
    };

    const testObject = new TestBuilder();
    testObject.build();
    expect(fs.createWriteStream).not.toHaveBeenCalled();

});

test('build - ProcessorBuilder - with processor', () => {

    class TestBuilder extends ProcessorBuilder {
        makeTargetDirectory(targetDir) {
            expect(targetDir).toBe('dist');
        }
    };

    const TestProcessor = class TestProcessor {
        constructor() {
            this.fileExtension = "scss";
        }
        add(definition) {
            expect(definition).toBeDefined();
            return this;
        }
        process() {
            return 'generated processor values'
        }
    };

    spyOn(fs, "createWriteStream").and.returnValue({
        once(type, callback) {
            expect(type).toBe('open');
            expect(callback).toBeDefined();
            callback();
        },
        write(content) {
            expect(content).toBe('generated processor values');
        }
    });

    const testObject = new TestBuilder();
    testObject
        .forProcessors([ TestProcessor ])
        .build();
    
});

test('build - ProcessorBuilder - succeeded with processor and definitions', () => {

    class TestBuilder extends ProcessorBuilder {
        makeTargetDirectory(targetDir) {
            expect(targetDir).toBe('dist');
        }
    };

    const TestProcessor = class TestProcessor {
        constructor() {
            this.fileExtension = "scss";
        }
        add(definition) {
            expect(definition).toBeDefined();
            return this;
        }
        process() {
            return 'generated processor values'
        }
    };

    const definitions = [
        [
            {
                "comment": "Test comment..."
            },
            {
                "variable": {
                    "name": "var1",
                    "value": "variable_1_value"
                }
            }
        ]
    ];
    
    spyOn(fs, "createWriteStream").and.returnValue({
        once(type, callback) {
            expect(type).toBe('open');
            expect(callback).toBeDefined();
            callback();
        },
        write(content) {
            expect(content).toBe('generated processor values');
        }
    });

    const testObject = new TestBuilder();
    testObject
        .withDefinitions(definitions)
        .forProcessors([ TestProcessor ])
        .build();
    
});

test('build - ProcessorBuilder - error while writing files.', () => {

    class TestBuilder extends ProcessorBuilder {
        makeTargetDirectory(targetDir) {
            expect(targetDir).toBe('dist');
        }
    };

    const TestProcessor = class TestProcessor {
        constructor() {
            this.fileExtension = "scss";
        }
        add(definition) {
            expect(definition).toBeDefined();
            return this;
        }
        process() {
            return 'generated processor values'
        }
    };

    const definitions = [
        [
            {
                "comment": "Test comment..."
            },
            {
                "variable": {
                    "name": "var1",
                    "value": "variable_1_value"
                }
            }
        ]
    ];
    
    const error = new Error();
    error.code = "EEXIST";

    spyOn(fs, "createWriteStream").and.throwError(error);
    
    const testObject = new TestBuilder();
    testObject
        .withDefinitions(definitions)
        .forProcessors([ TestProcessor ])
        .build();

});

test('build - ProcessorBuilder - error while writing files.', () => {

    class TestBuilder extends ProcessorBuilder {
        makeTargetDirectory(targetDir) {
            expect(targetDir).toBe('dist');
        }
    };

    const TestProcessor = class TestProcessor {
        constructor() {
            this.fileExtension = "scss";
        }
        add(definition) {
            expect(definition).toBeDefined();
            return this;
        }
        process() {
            return 'generated processor values'
        }
    };

    const definitions = [
        [
            {
                "comment": "Test comment..."
            },
            {
                "variable": {
                    "name": "var1",
                    "value": "variable_1_value"
                }
            }
        ]
    ];
    
    spyOn(fs, "createWriteStream").and.throwError("TEST_ERROR");
    
    expect(() => {
        const testObject = new TestBuilder();
        testObject
            .withDefinitions(definitions)
            .forProcessors([ TestProcessor ])
            .build();
    }).toThrowError("TEST_ERROR");
});
