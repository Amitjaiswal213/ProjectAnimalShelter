const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles, authorizeStatus } = require('../middlewares/auth');


const { 
    getAnimals, 
    getSingleAnimals,

    allAnimals,
    newAnimals,
    updateAnimals,
    getAnimalsDetails,
    deleteAnimals,

    createAnimalReview

    } = require('../controllers/animalsController');


// router.route('/injurydiseases/search').get(getInjuryDiseases);
// router.route('/injurydiseases').get(getInjuryDiseases);

router.route('/home/animals').get(getAnimals);
router.route('/animals/:id').get(getSingleAnimals);


router.route('/animals/review').put(isAuthenticatedUser, createAnimalReview);





router.route('/admin/animals/create').post(newAnimals);
router.route('/admin/animals').get(allAnimals);


router.route('/admin/animals/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAnimalsDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateAnimals)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAnimals)





module.exports = router;