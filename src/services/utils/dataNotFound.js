const dataNotFound = (data) => {
    if (!data) {
        const err = new Error("존재하지 않는 데이터");
        err.statusCode = 404;
        throw err;
    }
}

module.exports = dataNotFound;