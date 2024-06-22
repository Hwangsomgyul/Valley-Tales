const dotenv = require('dotenv');
dotenv.config();

if (process.env.MONGODB_URL === "undefined") {
    throw new Error('There Is No MongoDB');
}

module.exports = {
    applicationName: 'Valley-Tales',
    mongodbUrl: process.env.MONGODB_URL,
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY,
}