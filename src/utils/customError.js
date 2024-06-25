class ValidationError extends Error {
    statusCode = 400;
    constructor(message = '데이터 형식이 올바르지 않습니다.') {
        super(message);
        this.name = 'ValidationError';
    }
}

class UnauthenticatedError extends Error {
    statusCode = 401;
    constructor(message = '로그인이 필요합니다.') {
        super(message);
        this.name = 'UnauthenticatedError';
    }
}

class ForbiddenError extends Error {
    statusCode = 403;
    constructor(message = '접근 권한이 없습니다.') {
        super(message);
        this.name = 'ForbiddenError';
    }
}

class NotFoundError extends Error {
    statusCode = 404;
    constructor(message = '페이지를 찾을 수 없습니다.') {
        super(message);
        this.name = 'NotFoundError';
    }
}

class ConflictError extends Error {
    statusCode = 409;
    constructor(message = '이미 존재하는 데이터입니다.') {
        super(message);
        this.name = 'ConflictError';
    }
}

class InternalServerError extends Error {
    statusCode = 500;
    constructor(message = '에러입니다.') {
        super(message);
        this.name = 'InternalServerError';
    }
}

module.exports = {
    ValidationError,
    UnauthenticatedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalServerError,
};