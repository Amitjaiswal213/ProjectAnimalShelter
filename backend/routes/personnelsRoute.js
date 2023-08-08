const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const { 
    getPersonnelsAll,
    personnelsCreate,
    updatePersonnels,
    getPersonnelsDetails,
    deletePersonnel
    } = require('../controllers/personnelsController');


router.route('/admin/personnels').get(isAuthenticatedUser, authorizeRoles('admin'), getPersonnelsAll);

router.route('/admin/personnels/create').post(isAuthenticatedUser, authorizeRoles('admin'), personnelsCreate);


router.route('/admin/personnels/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getPersonnelsDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updatePersonnels)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deletePersonnel)





module.exports = router;
