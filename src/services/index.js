const getAllUsers = require('./user/getAllUsers');
const getUser = require('./user/getUser');
const editUser = require('./user/editUser');

const getAllEducations = require('./education/getAllEducations');
const addEducation = require('./education/addEducation');
const editEducation = require('./education/editEducation');
const deleteEducation = require('./education/deleteEducation');

const getAllAwards = require('./award/getAllAwards');
const addAward = require('./award/addAward');
const editAward = require('./award/editAward');
const deleteAward = require('./award/deleteAward');

const userLogout = require('./auth/userLogout');
const register = require('./auth/register');
const deleteUser = require('./auth/deleteUser');

const serveStatic = require('./serveStatic');
const checkAuthorization = require('./checkAuthorization');

module.exports = {
    getAllUsers,
    getUser,
    editUser,
    
    getAllEducations,
    addEducation,
    editEducation,
    deleteEducation,
    
    getAllAwards,
    addAward,
    editAward,
    deleteAward,
    
    userLogout,
    register,
    deleteUser,

    serveStatic,
    checkAuthorization,
};