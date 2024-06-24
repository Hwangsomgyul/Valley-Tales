const { NotFoundError } = require('./customError');

const userNotFound = (user) => {
    if (!user) {
        throw new NotFoundError('존재하지 않는 사용자입니다.');
    }
}

module.exports = userNotFound;