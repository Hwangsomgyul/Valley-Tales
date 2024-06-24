// 권한을 체크하는 함수
// 현재 주소의 패스 파라미터로 보낸 userId와 로그인한 사용자의 userId가 일치하는지 확인합니다.
// 일치하면 생성, 수정, 삭제 권한에 접근할 수 있고 그렇지 않다면 조회만 가능합니다.
const { ForbiddenError } = require('./customError');

const checkAuthorization = (userId, loginId) => {
    if (userId !== loginId) {
        throw new ForbiddenError('사용자가 일치하지 않습니다.');
    }
}

module.exports = checkAuthorization;