// 모델 함수가 완성되기 전까지 사용할 테스트 코드

// //모듈 가져오기
// const { model } = require('mongoose');
// //스키마 가져오기
// const userSchema = require('../schemas/User');
// //모델 생성
// const UserModel = model('User', userSchema);
// //내보내기
// module.exports = UserModel;




const mongoose = require('mongoose');
const UserSchema = require('../schemas/User'); // UserSchema를 정의한 파일의 경로

// 모델 정의
const UserModel = mongoose.model('User', UserSchema);

// User 클래스 정의
class User {
  static async create(newUser) {
    const createdUser = await UserModel.create(newUser);
    return createdUser;
  }

  static async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById(userId) {
    const user = await UserModel.findOne({ userId }); // findOne -> findById로 변경
    return user;
  }

  static async findAll() {
    const foundUsers = await UserModel.find({});
    const users = foundUsers.filter(user => !user.deletedAt);
    return users;
  }

  static async updateById(userId, newValues) {
    const filter = { userId }; // id -> _id로 변경
    const update = { $set: newValues };
    const options = { new: true }; // returnDocument: 'after' -> new: true로 변경

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, options); // findOneAndUpdate -> findByIdAndUpdate로 변경
    return updatedUser;
  }

  static async deleteById(userId) {
    const user = await UserModel.find({ userId });
    if (!user.deletedAt) {
      await UserModel.updateOne({ userId }, { deletedAt: Date.now() }); // deleteOne -> findByIdAndDelete로 변경
      return '삭제가 완료되었습니다.';
    }
    return '이미 삭제된 계정입니다.';
  }
}

module.exports = User;