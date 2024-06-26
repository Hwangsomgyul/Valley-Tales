/*
    스키마 내부에서 굳이 스키마 이름을 반복할 필요 없음 <-- 피드백 적용버전
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortId = require('./types/shortId');

const UserSchema = new Schema({
    userId: shortId, //건들지않기
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
        default: "설명을 추가해주세요.",
    },
    deletedAt: {
        type: Date,
    },
    resetPassword: {
        type: Boolean,
        default: false,
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


/*
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

*/