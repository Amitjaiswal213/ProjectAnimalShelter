const Personnels = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');


// Get all personnels   =>   /api/v1/admin/personnels
exports.getPersonnelsAll = async (req, res, next) => {

    const roles = ["employee","veterinarian","volunteer"]


    const personnels = await Personnels.find({role:roles});

    res.status(200).json({
        success: true,
        personnels
    })
}
exports.personnelsCreate = async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    const { name, email, password, role } = req.body;

    const personnels = await Personnels.create({
        name,
        email,
        password,
        role,
        status: 'Approved',
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(200).json({
        success: true,
        personnels
    })
}

// Get personnels details   =>   /api/v1/admin/personnels/:id
exports.getPersonnelsDetails = async (req, res, next) => {
    const personnels = await Personnels.findById(req.params.id);

    if (!personnels) {
        return next(new ErrorHandler(`Personnels does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        personnels
    })
}



exports.updatePersonnels = async (req, res, next) => {
    const newPersonnelsData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }


    const personnels = await Personnels.findByIdAndUpdate(req.params.id, newPersonnelsData, {
        new: true,
        runValidators: true,
        
    })

    res.status(200).json({
        success: true
    })

}


exports.deletePersonnel = async (req, res, next) => {
    const personnels = await Personnels.findById(req.params.id);

    if (!personnels) {
        return next(new ErrorHandler(`Personnel does not found with id: ${req.params.id}`))
    }

  
    await personnels.remove();

    res.status(200).json({
        success: true,
    })
}


