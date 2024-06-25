const mongoose = require('mongoose');
const UserSchema = require('../schemas/User'); // UserSchema를 정의한 파일의 경로

const { NotFoundError, ConflictError } = require('../../utils/customError');


/******사용하기전 npm install aws-sdk <--- 하기*****
// 이미지 저장시 사용하라고 피드백받음
//AWS SDK 초기화 시 리전과 자격 증명을 설정. 이를 환경변수로 구성해서 보안성을 높임
const AWS = require('aws-sdk'); // AWS SDK  
AWS.config.update({
  region: 'your-region', // AWS 리전 설정
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 환경변수에서 가져오기
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 환경변수에서 가져오기
});
const s3 = new AWS.S3(); // S3 인스턴스 생성
*/



// 커스텀 에러 클래스 정의 <--- 시간나면 따로 js파일로 분리해서 재사용성 높여보기
// class CustomError extends Error {
//   constructor(message, status) {
//     super(message);
//     this.status = status;
//   }
// }

// 모델 정의
const UserModel = mongoose.model('User', UserSchema);

// User 클래스 정의
class UserService {
  static async create(newUser) {
    const createdUser = await UserModel.create(newUser);
    return createdUser;
  }

  // 이메일로 사용자 찾기
  static async findByEmail(email) {                 
    //deletedAt 필드가 존재하지 않는 문서만 검색 (페이지네이션과 deletedAt 거르는 로직)
    const user = await UserModel.findOne({ email, deletedAt: { $exists: false } });
    // 본 함수는 이메일 중복 검사에만 사용하며 찾아낸 유저가 없을 때 통과시켜야 하기 때문에
    // 에러 처리를 하지 않았습니다.
    // 에러 처리 커스텀 에러로 처리
    // if (!user) {
    //   throw new NotFoundError(`이메일이 ${email}인 사용자를 찾을 수 없거나 이 사용자가 삭제되었습니다.`);
    // }
    return user;
  }

  // ID로 사용자 찾기
  static async findById(userId) {
    const user = await UserModel.findOne({ userId, deletedAt: { $exists: false } });
    if (!user) {
      throw new NotFoundError(`ID가 ${userId}인 사용자를 찾을 수 없거나 이 사용자가 삭제되었습니다.`);
    }
    return user;
  }

  // 페이지네이션 포함 모든 사용자 찾기
  static async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const users = await UserModel.find({ deletedAt: { $exists: false } })
                                 .skip(skip)
                                 .limit(limit);
    const totalUsers = await UserModel.countDocuments({ deletedAt: { $exists: false } });
    return { users, totalUsers };
  }

  // ID로 사용자 업데이트
  static async updateById(userId, newValues) {
    const filter = { userId, deletedAt: { $exists: false } };
    const update = { $set: newValues };
    const options = { new: true };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, options);
    if (!updatedUser) {
      throw new NotFoundError(`ID가 ${userId}인 사용자를 찾을 수 없거나 이 사용자가 삭제되었습니다.`);
    }
    return updatedUser;
  }

  // ID로 사용자 삭제
  static async deleteById(userId) {
    const user = await UserModel.findOne({ userId });
    if (!user) {
      throw new NotFoundError(`ID가 ${userId}인 사용자를 찾을 수 없습니다.`);
    }
    if (user.deletedAt) {
      throw new ConflictError(`ID가 ${userId}인 사용자는 이미 삭제되었습니다.`);
    }

    user.deletedAt = Date.now();
    await user.save();
    return '삭제가 완료되었습니다.';
  }

  
  /* 미완성_ AWS S3에 이미지 업로드
  //_추가기능부분 사용못할 가능성이 큼
  static async uploadImageToS3(file) {
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location; // 업로드된 파일의 URL 반환
    } catch (error) {
      throw new CustomError(`이미지를 업로드하는 중 오류가 발생했습니다: ${error.message}`, 500);
    }   
  }*/

}


module.exports = UserService;




/* 피드백 적용전 2번째 모델링
const mongoose = require('mongoose');
const UserSchema = require('../schemas/User'); // UserSchema를 정의한 파일의 경로

// 모델 정의
const UserModel = mongoose.model('User', UserSchema);

// User 클래스 정의
class UserService {
  static async create(newUser) {
    try {
      const createdUser = await UserModel.create(newUser);
      return createdUser;
    } catch (error) {
      throw new Error(`사용자를 생성하는 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // 이메일로 사용자 찾기
  static async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email, deletedAt: { $exists: false } });
      if (!user) {
        throw new Error(`이메일이 ${email}인 사용자를 찾을 수 없거나 이 사용자가 삭제되지 않았습니다.`);
      }
      return user;
    } catch (error) {
      throw new Error(`이메일로 사용자를 찾는 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // ID로 사용자 찾기
  static async findById(userId) {
    try {
      const user = await UserModel.findOne({ _id: userId, deletedAt: { $exists: false } });
      if (!user) {
        throw new Error(`ID가 ${userId}인 사용자를 찾을 수 없거나 이 사용자가 삭제되었습니다.`);
      }
      return user;
    } catch (error) {
      throw new Error(`ID로 사용자를 찾는 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // 모든 사용자 찾기
  static async findAll() {
    try {
      const users = await UserModel.find({ deletedAt: { $exists: false } });
      return users;
    } catch (error) {
      throw new Error(`모든 사용자를 찾는 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // ID로 사용자 업데이트
  static async updateById(userId, newValues) {
    try {
      const filter = { _id: userId, deletedAt: { $exists: false } };
      const update = { $set: newValues };
      const options = { new: true };

      const updatedUser = await UserModel.findOneAndUpdate(filter, update, options);
      if (!updatedUser) {
        throw new Error(`ID가 ${userId}인 사용자를 찾을 수 없거나 이 사용자가 삭제되지 않았습니다.`);
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`ID로 사용자를 업데이트하는 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // ID로 사용자 삭제
  static async deleteById(userId) {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error(`ID가 ${userId}인 사용자를 찾을 수 없습니다.`);
      }
      if (user.deletedAt) {
        throw new Error(`ID가 ${userId}인 사용자는 이미 삭제되었습니다.`);
      }

      user.deletedAt = Date.now();
      await user.save();
      return '삭제가 완료되었습니다.';
    } catch (error) {
      throw new Error(`ID로 사용자를 삭제하는 중 오류가 발생했습니다: ${error.message}`);
    }
  }
}

module.exports = UserService;

*/

//----------------------------------------------------------------------------------------------------------------


/* 백업용 코드 / 극 초기 모델

const mongoose = require('mongoose');
const UserSchema = require('../schemas/User'); // UserSchema를 정의한 파일의 경로

// 모델 정의
const UserModel = mongoose.model('User', UserSchema);

// User 클래스 정의
class UserService {
  static async create(newUser) {
    const createdUser = await UserModel.create(newUser);
    return createdUser;
  }

  //메일
  static async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  //ID
  static async findById(userId) {
    const user = await UserModel.findOne({ userId }); 
    return user;
  }

  //전부조회
  static async findAll() {
    const foundUsers = await UserModel.find({});
    const users = foundUsers.filter(user => !user.deletedAt);
    return users;
  }

  //업데이트
  static async updateById(userId, newValues) {
    const filter = { userId }; // id -> _id로 변경
    const update = { $set: newValues };
    const options = { new: true }; // returnDocument: 'after' -> new: true로 변경

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, options); // findOneAndUpdate -> findByIdAndUpdate로 변경
    return updatedUser;
  }

  //딜리트
  static async deleteById(userId) {
    const user = await UserModel.find({ userId });
    if (!user.deletedAt) {
      await UserModel.updateOne({ userId }, { deletedAt: Date.now() }); // deleteOne -> findByIdAndDelete로 변경
      return '삭제가 완료되었습니다.';
    }
    return '이미 삭제된 계정입니다.';
  }
}

module.exports = UserService;
*/