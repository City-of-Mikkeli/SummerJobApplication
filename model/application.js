var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  state: { type: String, default:'waiting', enum: ['waiting', 'processing', 'reserved', 'notified', 'confirmed', 'contract', 'denied'] },
  added: {type: Number, default: Date.now },
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
  phone: { type: Number, required: true },
  birthday: { type: Date, required: true },
  sex: { type: String, required: true, enum: ['male', 'female'] },
  email: { type: String, required: true },
  placeOfBirth: { type: String, required: true },
  home: { type: String, required: true },
  driversLicence: [String],
  driversLicenceYear: Number,
  education: { type: String, required: true },
  previousExpericence: { type: String, required: true },
  itSkills: { type: String, required: true },
  previouslyEmployed: { type: Boolean, required: true },
  whenEmployed: { type: Number},
  allergies: [String],
  languages: {
	  english: { type: String, enum: ['good', 'ok', 'bad'] },
	  swedish: { type: String, enum: ['good', 'ok', 'bad'] },
	  german: { type: String, enum: ['good', 'ok', 'bad'] }
  },
  suitableWorkingPeriod: [String],
  transportation: [String],
  additionalInfo: { type: String, required: true },
  primaryRequest: { type: String, required: true },
  secondaryRequest: { type: String, required: true },
  othersOk: { type: Boolean, required: true },
  basicDirectorCourses: String,
  fieldDirectorCourses: String
});

module.exports = mongoose.model('Application', schema);