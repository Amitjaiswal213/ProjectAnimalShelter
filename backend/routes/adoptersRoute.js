const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const { 
    getAdoptersAll,
    AdoptersCreate,
    getAdoptersDetails,
    updateAdopters,
    deleteAdopter

    } = require('../controllers/adoptersController');


router.route('/admin/adopters').get(isAuthenticatedUser, authorizeRoles('admin','employee'), getAdoptersAll);

router.route('/admin/adopters/create').post(isAuthenticatedUser, authorizeRoles('admin','employee'), AdoptersCreate);


router.route('/admin/adopters/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin','employee'), getAdoptersDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin','employee'), updateAdopters)
    .delete(isAuthenticatedUser, authorizeRoles('admin','employee'), deleteAdopter)





module.exports = router;
