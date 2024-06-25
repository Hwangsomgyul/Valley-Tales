const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');

const CertificateSchema = new Schema({
  certificateId: shortId, // certificateId에서 id로 변경
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: false,
  },
  issuingDate: {
    type: Date,
    required: false
  },
  expirationDate: { 
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Certificate',
});

module.exports = CertificateSchema;


/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');

const CertificateSchema = new Schema({
  certificateId: shortId,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: false,
  },
  issuingDate: {
    type: Date,
    required: false
  },
  expirationDate: { 
    type: Date,
    required: true
  },
  deletedAt : {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Certificate',
});

module.exports = CertificateSchema;
*/