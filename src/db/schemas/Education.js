const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');

const EducationSchema = new Schema({
  educationId: shortId,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  school: {
    type: String,
    required: false
  },
  degree: {
    type: String,
    required: true,
  },
  major: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  deletedAt: {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Education',
});

module.exports = EducationSchema;
