const mongoose = require('mongoose');

const vaccinatedSchema = mongoose.Schema({
    Name: String,
    Surnane: String,
    National_Id: String,
    DOB:String,
    Place:String,
    SecondDoseDate: String,
    Age:String,
    First_Dose : Boolean,
    First_Date : Date,
    Second_Dose: Boolean,
    Finger_Id : String
});

module.exports = mongoose.model('Vaccinateds',vaccinatedSchema);