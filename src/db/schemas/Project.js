const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortId = require('./types/shortId');

const ProjectSchema = new Schema({
  projectId: shortId,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: { 
    type: Date,
  },
  deletedAt: {
    type: Date,
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Project',
});

module.exports = ProjectSchema;


/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');

const ProjectSchema = new Schema({
  projectId: shortId,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: { 
    type: Date,
    required: false
  },
  deletedAt : {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Project',
});


module.exports = ProjectSchema;
*/