const userNotFound = (user) => {
    if (!user) {
        const err = new Error("존재하지 않는 사용자입니다.");
        err.statusCode = 404;
        throw err;
    }
}

module.exports = userNotFound;