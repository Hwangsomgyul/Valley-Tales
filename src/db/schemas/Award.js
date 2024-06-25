const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');

const AwardSchema = new Schema({
  awardId: shortId, // awardId에서 id로 변경
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: false,
  },
  date: {
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
  collection: 'Award', // 컬렉션 이름 수정
});

module.exports = AwardSchema;


/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');

const AwardSchema = new Schema({
  awardId: shortId,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: false,
  },
  date: {
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
  collection: 'Award', // 컬렉션 이름 수정
});

module.exports = AwardSchema;
*/