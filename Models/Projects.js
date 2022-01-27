/**
 * constants
 */
 const Validation = require('./../Constants/validation');
 const TypeCode = require('../Constants/typeCode');
 
 /**
  * packet
  */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 /**
  * define schema
  */
 const projectSchema = new Schema({
     project_name: { type: String, required: true },
     project_start_date: { type: Date },
     project_end_date: { type: Date },
     mode: { type: Number, default: TypeCode.PROJECT.MODE.SECURITY },
     project_manager: { type: Schema.Types.ObjectId, ref: 'User' },
     description: { type: String },
     category: { type: Schema.Types.Array },
     status: { type: Schema.Types.Array},
     members: [{ type: Schema.Types.ObjectId, ref: 'User'}],
     created_at: { type: Date, default: Date.now },
     update_at: { type: Date, default: Date.now },
     delete_flag: { type: Number, default: TypeCode.DELETE_FLAG.FALSE }
 });
 
 module.exports = mongoose.model('Project', projectSchema);