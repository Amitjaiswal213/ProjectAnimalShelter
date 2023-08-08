const Animals = require('../models/animalsModel');
const InjuryDiseases = require('../models/injurydiseasesModel');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');




//get all
exports.getAnimals = async (req,res,next) => {
    const resPerPage = 9;
    const animalsCount = await Animals.countDocuments();


    const apiFeatures = new APIFeatures(Animals.find(),req.query).search().filter();
    
    apiFeatures.pagination(resPerPage);

    const animals = await apiFeatures.query;


    let filteredAnimalsCount = animals.length;

    if(!animals) {
      return next(new ErrorHandler('my error',400))    
    }
  
      res.status(200).json({
        success: true,
        animalsCount,
        filteredAnimalsCount,
        resPerPage,
        animals,
      })
  
}


exports.newAnimals = async (req, res, next) => {

    let image = []
    if (typeof req.body.image === 'string') {
        image.push(req.body.image)
    } else {
        image = req.body.image
    }

    let imagesLinks = [];

    for (let i = 0; i < image.length; i++) {
        const result = await cloudinary.v2.uploader.upload(image[i], {
            folder: 'animals',
            width: 1500,
            height: 1500,
            crop: "scale"
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.image = imagesLinks

    const animals = await Animals.create(req.body);

    res.status(201).json({
        success: true,
        animals
    })
}


exports.updateAnimals = async (req, res, next) => {

    let animals = await Animals.findById(req.params.id);

    if (!animals) {
        return next(new ErrorHandler('Animal not found', 404));
    }
    let image = []
    if (typeof req.body.image === 'string') {
        image.push(req.body.image)
    } else {
        image = req.body.image
    }
    if (image !== undefined) {
        // Deleting image associated with the animals
        for (let i = 0; i < animals.image.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(animals.image[i].public_id)
        }
        let imagesLinks = [];
        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.v2.uploader.upload(image[i], {
                folder: 'animals',
                width: 1500,
                height: 1500,
                crop: "scale"
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.image = imagesLinks
    }

    animals = await Animals.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        animals
    })

}


// exports.newAnimals = async (req, res, next) => {

//       const result = await cloudinary.v2.uploader.upload(req.body.image, {
//           folder: 'animals',
//           width: 1500,
//           height: 1500,
//           crop: "scale"
//       })


//       const {
//         name,
//         type,
//         breed,
//         sex,
//         age,
//         healthstatus,
//         adaptionstatus,
//       } = req.body;



//       const animals = await Animals.create({
//         name,
//         type,
//         breed,
//         sex,
//         age,
//         healthstatus,
//         adaptionstatus,
//         image: {
//             public_id: result.public_id,
//             url: result.secure_url
//         }
//     })

//     res.status(200).json({
//         success: true,
//         animals
//     })
// }


// Get single injury   =>   /api/v1/order/:id
exports.getSingleAnimals = async (req, res, next) => {
  const animals = await Animals.findById(req.params.id);

  if (!animals) {
      return next(new ErrorHandler('No pet found with this ID', 404))
  }

  res.status(200).json({
      success: true,
      animals
  })

}



// Get all animals   =>   /api/v1/admin/animals
exports.allAnimals = async (req, res, next) => {
  const animals = await Animals.find();
//   .populate({ path: 'injurydiseases', select: 'name -_id' })

  res.status(200).json({
      success: true,
      animals
  })
}






// Get single injury   =>   /api/v1/order/:id
exports.getAnimalsDetails = async (req, res, next) => {
  const animals = await Animals.findById(req.params.id);

  if (!animals) {
      return next(new ErrorHandler('No pet found with this ID', 404))
  }

  res.status(200).json({
      success: true,
      animals,
      
      
  })

}

// exports.updateAnimals = async (req, res, next) => {


//     const newAnimalsData = {
//           name: req.body.name,
//           type: req.body.type,
//           breed: req.body.breed,
//           sex: req.body.sex,
//           age: req.body.age,
//           healthstatus: req.body.healthstatus,
//           adaptionstatus: req.body.adaptionstatus,
//     }


//     const animals = await Animals.findByIdAndUpdate(req.params.id, newAnimalsData, {
//         new: true,
//         runValidators: true,
        
//     })

//     res.status(200).json({
//         success: true
//     })

// }


// Delete user   =>   /api/v1/admin/user/:id
exports.deleteAnimals = async (req, res, next) => {
  const animals = await Animals.findById(req.params.id);

  if (!animals) {
      return next(new ErrorHandler(`Animal does not found with id: ${req.params.id}`))
  }


  await animals.remove();

  res.status(200).json({
      success: true,
  })
}






exports.createAnimalReview = async (req, res, next) => {

      const { comment, animalsId } = req.body;

      const review = {
          user: req.user._id,
          name: req.user.name,
          // rating: Number(rating),
          comment
      }

      const animals = await Animals.findById(animalsId);

      const isReviewed = animals.reviews.find(
          r => r.user.toString() === req.user._id.toString()
      )

      if (isReviewed) {
        animals.reviews.forEach(review => {
              if (review.user.toString() === req.user._id.toString()) {
                  review.comment = comment;
              }
          })

      } else {
        animals.reviews.push(review);
        animals.numOfReviews = animals.reviews.length
      }




      await animals.save({ validateBeforeSave: false });

      res.status(200).json({
          success: true
      })

}








