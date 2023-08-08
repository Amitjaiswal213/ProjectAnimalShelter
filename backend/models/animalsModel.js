const mongoose = require('mongoose')



const animalsSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Please enter animal name'],
        maxLength: [20, 'animal name cannot exceed 20 characters']
    },

    type: {
        type: String,
        required: [true, 'Please enter animal type'],
        trim: true,
        maxLength: [20, 'Product name cannot exceed 20 characters'],
    },

    breed: {
        type: String,
        required: [true, 'Please enter animal breed'],
        trim: true,
        maxLength: [20, 'Product name cannot exceed 20 characters'],
        // enum: {
        //     values: [
        //         'Askal',
        //         'Mixed',
        //         'Bengal'
        //     ],
        //     message: 'Please select breed for animal'
        // }
    },

    sex: {
        type: String,
        required: [true, 'Please select the animal sex'],
    },

    age: {
        type: Number,
        required: [true, 'Please enter animal age'],
    },

    healthstatus: {
        type: String,
        required: [true, 'Please enter animal health status'],
    },

    adaptionstatus: {
        type: String,
        required: [true, 'Please enter animal adoption status'],
    },



    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],


    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                // required: true
            },
            name: {
                type: String,
                // required: true
            },

            comment: {
                type: String,
                // required: true
            }
        }
    ],


    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },

    injurydiseases: {
        type: mongoose.Schema.ObjectId,
        ref: 'injurydiseases',
    },






})

module.exports = mongoose.model('animals', animalsSchema);




// animal name 
// animal type
// animal breed
// animal sex
// animal age
// animal healthstatus
// animal adaptionstatus



