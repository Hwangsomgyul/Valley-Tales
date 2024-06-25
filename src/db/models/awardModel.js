const mongoose = require('mongoose');
const AwardSchema = require('../schemas/Award');
const userModel = require('./userModel');
const { NotFoundError } = require('../../utils/customError');

// class CustomError extends Error {
//   constructor(statusCode, message) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

const AwardModel = mongoose.model('Award', AwardSchema);

class AwardService {
  // 수상이력 추가
  // static async addAward(data) {
  //   const award = new Award(data);
  //   try {
  //     await award.save();
  //     return award;
  //   } catch (error) {
  //     throw new CustomError(400, '수상이력 추가 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async addAward(data) {
    const addedAward = await AwardModel.create(data);
    if (!addedAward) {
      throw new Error('수상 정보 추가 중 오류가 발생했습니다.');
    }
    return addedAward;
  }

  // 수상정보 조회
  // static async getAwardById(awardId) {
  //   try {
  //     const award = await Award.findById(awardId).populate('author');
  //     if (!award) {
  //       throw new CustomError(404, '해당 ID의 수상 정보를 찾을 수 없습니다.');
  //     }
  //     return award;
  //   } catch (error) {
  //     throw new CustomError(400, '수상정보 조회 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async getAward(awardId) {
    const foundAward = await AwardModel.findOne({ awardId, deletedAt: { $exists: false }}).populate('author');
    if (!foundAward) {
      throw new NotFoundError('해당 수상 정보를 찾을 수 없습니다.');
    }
    return foundAward;
  }

  static async getAllAwardsById(userId) {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) {
      throw new NotFoundError('사용자가 존재하지 않습니다.');
    }
    const allAwards = await AwardModel.find({ author: foundUser, deletedAt: { $exists: false }});
    return allAwards;
  }

  // 수상정보 수정
  // static async updateAward(awardId, updateData) {
  //   try {
  //     const award = await Award.findByIdAndUpdate(awardId, updateData, { new: true });
  //     if (!award) {
  //       throw new CustomError(404, '해당 ID의 수상 정보를 찾을 수 없습니다.');
  //     }
  //     return award;
  //   } catch (error) {
  //     throw new CustomError(400, '수상정보 수정 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async updateAward(awardId, updateData) {
    const updatedAward = await AwardModel.findOneAndUpdate(
      { awardId, deletedAt: { $exists: false } },
      updateData,
      { new: true }
    );
    if (!updatedAward) {
      throw new NotFoundError('해당 ID의 수상 정보를 찾을 수 없습니다.');
    }
    return updatedAward;
  }

  // 수상정보 삭제 (논리 삭제)
  // static async deleteAward(awardId) {
  //   try {
  //     const award = await Award.findByIdAndUpdate(awardId, { deletedAt: new Date() }, { new: true });
  //     if (!award) {
  //       throw new CustomError(404, '해당 ID의 수상 정보를 찾을 수 없습니다.');
  //     }
  //     return { message: '수상정보 삭제 성공' };
  //   } catch (error) {
  //     throw new CustomError(400, '수상정보 삭제 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async deleteAward(awardId) {
    const deletedAward = await AwardModel.findOneAndUpdate(
      { awardId, deletedAt: { $exists: false } },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedAward) {
      throw new NotFoundError('해당 ID의 수상 정보를 찾을 수 없습니다.');
    }
    return { message: '수상 정보 삭제 성공' };
  }
}

module.exports = AwardService;



/*
const { model } = require('mongoose');
const awardSchema = require('../schemas/Award');

// 모델 정의
const AwardModel = model('Award', awardSchema);
module.exports = AwardModel;

const Award = require('../models/Award');

class AwardService {
  // 수상이력 추가
  static async addAward(data) {
    try {
      const award = new Award(data);
      await award.save();
      return award;
    } catch (error) {
      throw new Error('수상이력 추가 중 오류가 발생했습니다.');
    }
  }

  // 수상정보 조회
  static async getAwardById(awardId) {
    try {
      const award = await Award.findById(awardId).populate('author');
      if (!award) {
        throw new Error('해당 ID의 수상 정보를 찾을 수 없습니다.');
      }
      return award;
    } catch (error) {
      throw new Error('수상정보 조회 중 오류가 발생했습니다.');
    }
  }

  // 수상정보 수정
  static async updateAward(awardId, updateData) {
    try {
      const award = await Award.findByIdAndUpdate(awardId, updateData, { new: true });
      if (!award) {
        throw new Error('해당 ID의 수상 정보를 찾을 수 없습니다.');
      }
      return award;
    } catch (error) {
      throw new Error('수상정보 수정 중 오류가 발생했습니다.');
    }
  }

  // 수상정보 삭제 (논리 삭제)
  static async deleteAward(awardId) {
    try {
      const award = await Award.findByIdAndUpdate(awardId, { deletedAt: new Date() }, { new: true });
      if (!award) {
        throw new Error('해당 ID의 수상 정보를 찾을 수 없습니다.');
      }
      return { message: '수상정보 삭제 성공' };
    } catch (error) {
      throw new Error('수상정보 삭제 중 오류가 발생했습니다.');
    }
  }
}

module.exports = AwardService;
*/