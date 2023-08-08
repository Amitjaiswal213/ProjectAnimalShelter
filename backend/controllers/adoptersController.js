const Adopters = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');



// Get all adopters   =>   /api/v1/admin/adopters
exports.getAdoptersAll = async (req, res, next) => {
    const adopters = await Adopters.find({role:"adopter"});

    res.status(200).json({
        success: true,
        adopters
    })
}

exports.AdoptersCreate = async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    const { name, email, password, status } = req.body;

    const adopters = await Adopters.create({
        name,
        email,
        password,
        role: 'adopter',
        status,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(200).json({
        success: true,
        adopters
    })
}


// Get adopters details   =>   /api/v1/admin/adopters/:id
exports.getAdoptersDetails = async (req, res, next) => {
    const adopters = await Adopters.findById(req.params.id);

    if (!adopters) {
        return next(new ErrorHandler(`Adopter does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        adopters
    })
}



exports.updateAdopters = async (req, res, next) => {
    const newAdoptersData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        status: req.body.status


    }

    if (req.body.avatar !== '') {
        const adopters = await Adopters.findById(req.params.id)

        const image_id = adopters.avatar.public_id;
        const res = await cloudinary.uploader.destroy(image_id);

        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newAdoptersData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }


    const adopters = await Adopters.findByIdAndUpdate(req.params.id, newAdoptersData, {
        new: true,
        runValidators: true,
        
    })

    res.status(200).json({
        success: true
    })

}


exports.deleteAdopter = async (req, res, next) => {
    const adopters = await Adopters.findById(req.params.id);

    if (!adopters) {
        return next(new ErrorHandler(`Adopter does not found with id: ${req.params.id}`))
    }

  
    await adopters.remove();

    res.status(200).json({
        success: true,
    })
}