class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized');
        this.statusCode = 401;
    }
}

module.exports = UnauthorizedError;