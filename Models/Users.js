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
const userSchema = new Schema({
    email: { type: String, required: true, max: Validation.EMAIL.MAX_LENGTH },
    password: { type: String, default: "example@Ex123", max: Validation.PASSWORD.MAX_LENGTH, min: Validation.PASSWORD.MIN_LENGTH},
    username: { type: String, max: Validation.TEXT.MAX_LENGTH, required: true },
    fullname: { type: String, max: Validation.TEXT.MAX_LENGTH, required: true },
    birthday: { type: Date },
    role: { type: Number, default: TypeCode.USER.ROLE.STAFF, required: true },
    personal_email: { type: String, max: Validation.EMAIL.MAX_LENGTH },
    phone: { type: String },
    avatar: { type: String },
    sub_avatar: { type: String },
    gender: { type: Number, default: TypeCode.USER.GENDER.MALE},
    workform: { type: Number, default: TypeCode.USER.WORKFORM.FULLTIME},
    room: { type: Number},
    position: { type: Number},
    experience: { type: Number},
    address: { type: String, max: Validation.TEXT.MAX_LENGTH },
    identity_card: { type: String },
    identity_date: { type: Date },
    identity_place: { type: String, max: Validation.TEXT.MAX_LENGTH },
    bank_account: { type: String },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    delete_flag: { type: Number, default: TypeCode.DELETE_FLAG.FALSE }
});

module.exports = mongoose.model('User', userSchema);