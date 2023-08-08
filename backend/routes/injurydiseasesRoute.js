const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const { 
    newInjuryDiseases, 
    getInjuryDiseases, 
    getInjuryDiseasesDetails, 
    updateSingleInjuryDiseases, 
    deleteInjuryDiseases 
    } = require('../controllers/injurydiseaseController');


router.route('/admin/injurydiseases').get(isAuthenticatedUser,getInjuryDiseases);


router.route('/admin/injurydiseases/new').post(isAuthenticatedUser, newInjuryDiseases);


router.route('/admin/injurydiseases/:id')
.get(getInjuryDiseasesDetails)
.put(isAuthenticatedUser, updateSingleInjuryDiseases)
.delete(isAuthenticatedUser,  deleteInjuryDiseases);

module.exports = router;