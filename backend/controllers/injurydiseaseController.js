const InjuryDiseases = require('../models/injurydiseasesModel');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');



//create
exports.newInjuryDiseases = async (req,res,next) => {
  const { name } = req.body;

	const injurydiseases = await InjuryDiseases.create({
    name
  });

    res.status(200).json({
      success: true,
      injurydiseases
    })
}


//Show 
exports.getInjuryDiseases = async (req,res,next) => {
  const injurydiseases = await InjuryDiseases.find();

  res.status(200).json({
      success: true,
      injurydiseases
  })

}


// Get single injury   =>   /api/v1/order/:id
exports.getInjuryDiseasesDetails = async (req, res, next) => {
    const injurydiseases = await InjuryDiseases.findById(req.params.id);

    if (!injurydiseases) {
        return next(new ErrorHandler('No injury and diseases found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        injurydiseases
    })
}




//Update
exports.updateSingleInjuryDiseases = async(req,res,next) => {
    let injurydiseases = await InjuryDiseases.findById(req.params.id);

    if (!injurydiseases) {
      return next(new ErrorHandler('No injury and diseases found with this ID', 404))
    }

     injurydiseases = await InjuryDiseases.findByIdAndUpdate(req.params.id,req.body,{
       new: true,
       runValidators:true,
       useFindandModify:false
     })

     res.status(200).json({
       success:true,
       injurydiseases
     })
}


//Delete
exports.deleteInjuryDiseases = async(req,res,next) =>{
    const injurydiseases = await InjuryDiseases.findById(req.params.id);

    if (!injurydiseases) {
      return next(new ErrorHandler('No injury and diseases found with this ID', 404))
    }

    await injurydiseases.remove();

    res.status(200).json({
       success: true,
       message: 'injury diseases deleted'
     })
}







//Show
// exports.getInjuryDiseases = async (req,res,next) => {
// 	const injurydiseases = await InjuryDiseases.find();

//     if(!injurydiseases) {
//       return next(new ErrorHandler('injury and diseases not found',404));
//     }

// 	res.status(200).json({
// 		success: true,
//         count: injurydiseases.length,
//         injurydiseases
// 	})
// }



//Show with search 
// exports.getInjuryDiseases = async (req,res,next) => {
//   // const injurydiseases = await InjuryDiseases.find();
// const apiFeatures = new APIFeatures(InjuryDiseases.find(),req.query).search();
// const injurydiseases = await apiFeatures.query;

// res.status(200).json({
//     success: true,
//     count: injurydiseases.length,
//     injurydiseases
// })


// }