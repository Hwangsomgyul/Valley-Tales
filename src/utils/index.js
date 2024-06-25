const checkAuthorization = require('./checkAuthorization');
const userNotFound = require('./userNotFound');
const dataNotFound = require('./dataNotFound');
const generateRandomNumbers = require('./generateRandomNumbers');
const sendEmail = require('./sendEmail');

module.exports = {
    checkAuthorization,
    userNotFound,
    dataNotFound,
    generateRandomNumbers,
    sendEmail,
};