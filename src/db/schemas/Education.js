const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');

const EducationSchema = new Schema({
  educationId: shortId, // educationId에서 id로 변경
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
    required: true
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


/*
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
    required: true
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
*/