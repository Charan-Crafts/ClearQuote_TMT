const mongoose = require("mongoose");

const translateObject ={
    
    languageCode:{
        type:String,
    },
    translatedText:{
        type:String
    }
}

const translateSchema = new mongoose.Schema({

    text:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    translations:[
        translateObject
    ]
},{timestamps:true})


const TranslateModel = mongoose.model("Translate",translateSchema);

module.exports = TranslateModel;