const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;
const InjuryDiseasesSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                unique: true,
                required: true
            },
            

        },
    { timestamps: true }
);

//injurydiseases is name of model in mongodb
module.exports = mongoose.model('injurydiseases', InjuryDiseasesSchema);