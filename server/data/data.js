 const mongoose = require('mongoose');

 let Schema = mongoose.Schema;

 let numReq = {
     type: Number,
     //required: true,
     default: 0
 }

 let dataSchema = new Schema({

     ultimo: numReq,

     hoy: numReq,

     tickets: [{ numero: Number, escritorio: Number }],

     ultimos4: [{ numero: Number, escritorio: Number }]

 })

 module.exports = mongoose.model('Data', dataSchema);