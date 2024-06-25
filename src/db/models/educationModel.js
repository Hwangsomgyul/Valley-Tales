const mongoose = require('mongoose');
const EducationSchema = require('../schemas/Education');
const userModel = require('./userModel');

const { NotFoundError } = require('../../utils/customError');


//커스텀 에러
// class CustomError extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }

// 모델 정의
const EducationModel = mongoose.model('Edu', EducationSchema);

class EducationService {
  
  // static async getEducationById(id) {
  //   const educationData = await EducationModel.findById(id);

  //   if (!educationData) {
  //     throw new CustomError(404, '해당 학력을 찾을 수 없습니다.');
  //   }
    
  //   return educationData;
  // }
  static async getEducation(educationId) {
    const foundEducation = await EducationModel.findOne({ educationId, deletedAt: { $exists: false }}).populate('author');
    if (!foundEducation) {
      throw new NotFoundError('해당 학력을 찾을 수 없습니다.');
    }
    return foundEducation;
  }

  static async getAllEducationsById(userId) {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) {
      throw new NotFoundError('사용자가 존재하지 않습니다.');
    }
    const allEducations = await EducationModel.find({ author: foundUser, deletedAt: { $exists: false } });

    // if (!educations || educations.length === 0) {
    //   throw new NotFoundError('사용자의 학력을 찾을 수 없습니다.');
    // }

    return allEducations;
  }

  // static async addEducation(educationData) {
  //   const newEducation = new EducationModel(educationData);

  //   try {
  //     await newEducation.save();
  //     return newEducation;
  //   } catch (error) {
  //     throw new CustomError(400, '학력 추가 실패: ' + error.message);
  //   }
  // }
  static async addEducation(data) {
    const addedEducation = await EducationModel.create(data);
    if (!addedEducation) {
      throw new Error('학력 추가 중 오류가 발생했습니다.');
    }
    return addedEducation;
  }

  static async updateEducation(educationId, updateData) {
    const updatedEducation = await EducationModel.findOneAndUpdate({ educationId, deletedAt: { $exists: false } }, updateData, { new: true });

    if (!updatedEducation) {
      throw new NotFoundError('해당 학력을 찾을 수 없습니다.');
    }

    return updatedEducation;
  }

  static async deleteEducation(educationId) {
    const deletedEducation = await EducationModel.findOneAndUpdate(
      { educationId, deletedAt: { $exists: false } },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedEducation) {
      throw new NotFoundError('해당 ID의 학력을 찾을 수 없습니다.');
    }
    return { message: '학력 삭제 성공' };
  }
}

module.exports = EducationService;









/* 백업용 
const mongoose = require('mongoose');
const EducationSchema = require('../schemas/Education');

// 모델 정의
const EducationModel = mongoose.model('Edu', EducationSchema);

class EducationService {
  // 학력 조회
  static async getEducationById(id) {
    try {
      const educationData = await education.findById(id);
      return educationData;
    } catch (error) {
      throw new Error('학력 조회 실패: ' + error.message);
    }
  }

  // 특정 사용자의 모든 학력 조회
  static async getEducationByUserId(user_id) {
    try {
      const educations = await education.find({ user_id });
      return educations;
    } catch (error) {
      throw new Error('사용자의 학력 조회 실패: ' + error.message);
    }
  }

  // 학력 추가
  static async addEducation(educationData) {
    try {
      const newEducation = new education(educationData);
      await newEducation.save();
      return newEducation;
    } catch (error) {
      throw new Error('학력 추가 실패: ' + error.message);
    }
  }

  // 학력 수정
  static async updateEducation(id, updateData) {
    try {
      const updatedEducation = await education.findByIdAndUpdate(id, updateData, { new: true });
      return updatedEducation;
    } catch (error) {
      throw new Error('학력 수정 실패: ' + error.message);
    }
  }

  // 학력 삭제
  static async deleteEducation(id) {
    try {
      await education.findByIdAndDelete(id);
      return { message: '학력 삭제 성공' };
    } catch (error) {
      throw new Error('학력 삭제 실패: ' + error.message);
    }
  }
}

export { EducationService };
*/