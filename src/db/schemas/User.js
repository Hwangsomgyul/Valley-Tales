const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortId = require('./types/shortId');

const UserSchema = new Schema({
    userId: shortId,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    deletedAt: {
        type: Date,
        required: false,
    }
}, {
    // timestamps가 createdAt, updatedAt 자동관리함
    // versionKey: false 임으로 _v 필드를 생성하지 않음
    // collection 프로젝트 컬렉션 이름 지정
    timestamps: true,
    versionKey: false,
    collection: 'User',
});

module.exports = UserSchema;
