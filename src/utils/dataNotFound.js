const { NotFoundError } = require('./customError');

const dataNotFound = (data) => {
    if (!data) {
        throw new NotFoundError('데이터가 존재하지 않습니다.');
    }
}

module.exports = dataNotFound;