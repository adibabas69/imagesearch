//Requirement for mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//model
const searchTermSchema = new Schema({
  searchVal : String,//object
  searchDate : Date
},
{
  timestamps:true
}
                                    
);

//Connect model and collection
const ModelClass = mongoose.model("searchTerm" , searchTermSchema)

module.exports = ModelClass;