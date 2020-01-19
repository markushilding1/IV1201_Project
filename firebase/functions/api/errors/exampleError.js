class ExampleError extends Error {
    constructor() {
        super('My Custom Error');
        this.statusCode = 400;
    }
}

module.exports = ExampleError;