const getAllUsers = require('./getAllUsers');
const getUser = require('./getUser');
const editUser = require('./editUser');
const getAllEducations = require('./getAllEducations');
const addEducation = require('./addEducation');
const editEducation = require('./editEducation');
const deleteEducation = require('./deleteEducation');
const register = require('./register');
const serveStatic = require('./serveStatic');
const deleteUser = require('./deleteUser');
const userLogout = require('./userLogout');

module.exports = {
    getAllUsers,
    getUser,
    editUser,
    getAllEducations,
    addEducation,
    editEducation,
    deleteEducation,
    register,
    serveStatic,
    deleteUser,
    userLogout,
};