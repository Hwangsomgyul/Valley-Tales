const mongoose = require('mongoose');
const EducationSchema = require('../schemas/Education');


//커스텀 에러
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// 모델 정의
const EducationModel = mongoose.model('Edu', EducationSchema);

class EducationService {
  
  static async getEducationById(id) {
    const educationData = await EducationModel.findById(id);

    if (!educationData) {
      throw new CustomError(404, '해당 학력을 찾을 수 없습니다.');
    }
    
    return educationData;
  }

  static async getEducationByUserId(user_id) {
    const educations = await EducationModel.find({ user_id });

    if (!educations || educations.length === 0) {
      throw new CustomError(404, '사용자의 학력을 찾을 수 없습니다.');
    }

    return educations;
  }

  static async addEducation(educationData) {
    const newEducation = new EducationModel(educationData);

    try {
      await newEducation.save();
      return newEducation;
    } catch (error) {
      throw new CustomError(400, '학력 추가 실패: ' + error.message);
    }
  }

  static async updateEducation(id, updateData) {
    const updatedEducation = await EducationModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedEducation) {
      throw new CustomError(404, '해당 학력을 찾을 수 없습니다.');
    }

    return updatedEducation;
  }

  static async deleteEducation(id) {
    const deletedEducation = await EducationModel.findByIdAndDelete(id);

    if (!deletedEducation) {
      throw new CustomError(404, '해당 학력을 찾을 수 없습니다.');
    }

    return { message: '학력 삭제 성공' };
  }
}

module.exports = { EducationService, CustomError };









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