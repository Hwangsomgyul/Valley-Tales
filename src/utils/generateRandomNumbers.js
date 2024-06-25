const generateRandomNumbers = (n) => {
    let randomInteger = String(Math.floor(Math.random() * (10 ** n)));
    while(randomInteger.length < n) {
        randomInteger = '0' + randomInteger;
    }
    return randomInteger;
}

module.exports = generateRandomNumbers;