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

const getAllCertificates = require('./certificate/getAllCertificates');
const addCertificate = require('./certificate/addCertificate');
const editCertificate = require('./certificate/editCertificate');
const deleteCertificate = require('./certificate/deleteCertificate');

const getAllProjects = require('./project/getAllProjects');
const addProject = require('./project/addProject');
const editProject = require('./project/editProject');
const deleteProject = require('./project/deleteProject');

const userLogout = require('./auth/userLogout');
const register = require('./auth/register');
const deleteUser = require('./auth/deleteUser');

const serveStatic = require('./serveStatic');

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

    getAllCertificates,
    addCertificate,
    editCertificate,
    deleteCertificate,

    getAllProjects,
    addProject,
    editProject,
    deleteProject,
    
    userLogout,
    register,
    deleteUser,

    serveStatic,
};