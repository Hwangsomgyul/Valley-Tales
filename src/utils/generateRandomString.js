const generateRandomString = (n = 12) => {
    if (n < 10) {
        n = 10;
    }
    const randomString = Math.random().toString(36).slice(2, n);
    return randomString;
}

module.exports = generateRandomString;