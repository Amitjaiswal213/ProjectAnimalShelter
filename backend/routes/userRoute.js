const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles, authorizeStatus } = require('../middlewares/auth');


const { 
		registerUser,
		loginUser,
		logout,
		
		getUserProfile,
		updateProfile,
		updatePassword,
		forgotPassword,
		resetPassword,

		allUsers,
		getUserDetails,
		updateUser,
		deleteUser,


	} = require('../controllers/authController');



//Get Profile
router.route('/profile').get(isAuthenticatedUser, getUserProfile);

//Update Profile
router.route('/profile/update').put(isAuthenticatedUser, updateProfile)


//User Register, Login, Logout
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);



//Forgot, Reset, Update Password
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);




router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)










// router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)
    // .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    // .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    


// router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)




module.exports = router;