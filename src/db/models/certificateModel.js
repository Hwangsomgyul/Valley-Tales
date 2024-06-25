const mongoose = require('mongoose');
const CertificateSchema = require('../schemas/Certificate');
const userModel = require('./userModel');
const { NotFoundError, InternalServerError } = require('../../utils/customError');

//커스텀에러
// class CustomError extends Error {
//   constructor(statusCode, message) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }
const CertificateModel = mongoose.model('Certificate', CertificateSchema);

class CertificateService {
  // 자격증 추가
  // static async addCertificate(data) {
  //   const certificate = new Certificate(data);
  //   try {
  //     await certificate.save();
  //     return certificate;
  //   } catch (error) {
  //     throw new CustomError(400, '자격증 추가 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async getCertificate(certificateId) {
    const foundCertificate = await CertificateModel.findOne({ certificateId, deletedAt: { $exists: false }}).populate('author');
    if (!foundCertificate) {
      throw new NotFoundError('해당 자격증을 찾을 수 없습니다.');
    }
    return foundCertificate;
  }

  static async addCertificate(data) {
    const addedCertificate = await CertificateModel.create(data);
    if (!addedCertificate) {
      throw new InternalServerError('자격증 추가 중 오류가 발생했습니다.');
    }
    return addedCertificate;
  }

  // 자격증 정보 조회
  // static async getCertificateById(certificateId) {
  //   try {
  //     const certificate = await Certificate.findById(certificateId).populate('author');
  //     if (!certificate) {
  //       throw new CustomError(404, '해당 ID의 자격증을 찾을 수 없습니다.');
  //     }
  //     return certificate;
  //   } catch (error) {
  //     throw new CustomError(400, '자격증 조회 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async getAllCertificatesById(userId) {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) {
      throw new NotFoundError('사용자가 존재하지 않습니다.');
    }
    const allCertificates = await CertificateModel.find({ author: foundUser, deletedAt: { $exists: false }});
    return allCertificates;
  }

  // 자격증 정보 수정
  // static async updateCertificate(certificateId, updateData) {
  //   try {
  //     const certificate = await Certificate.findByIdAndUpdate(
  //       certificateId,
  //       updateData,
  //       { new: true }
  //     );
  //     if (!certificate) {
  //       throw new CustomError(404, '해당 ID의 자격증을 찾을 수 없습니다.');
  //     }
  //     return certificate;
  //   } catch (error) {
  //     throw new CustomError(400, '자격증 수정 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async updateCertificate(certificateId, updateData) {
    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      { certificateId, deletedAt: { $exists: false } },
      updateData,
      { new: true }
    );
    if (!updatedCertificate) {
      throw new NotFoundError('해당 ID의 자격증을 찾을 수 없습니다.');
    }
    return updatedCertificate;
  }

  // 자격증 삭제 (논리 삭제)
  // static async deleteCertificate(certificateId) {
  //   try {
  //     const certificate = await Certificate.findByIdAndUpdate(
  //       certificateId,
  //       { deletedAt: new Date() },
  //       { new: true }
  //     );
  //     if (!certificate) {
  //       throw new CustomError(404, '해당 ID의 자격증을 찾을 수 없습니다.');
  //     }
  //     return { message: '자격증 삭제 성공' };
  //   } catch (error) {
  //     throw new CustomError(400, '자격증 삭제 중 오류가 발생했습니다: ' + error.message);
  //   }
  // }
  static async deleteCertificate(certificateId) {
    const deletedCertificate = await CertificateModel.findOneAndUpdate(
      { certificateId, deletedAt: { $exists: false } },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedCertificate) {
      throw new NotFoundError('해당 ID의 자격증을 찾을 수 없습니다.');
    }
    return { message: '자격증 삭제 성공' };
  }
}

module.exports = CertificateService;






/*
// models/Certificate.js
const mongoose = require('mongoose');
const CertificateSchema = require('../schemas/Certificate'); // 실제 스키마 파일 경로로 변경

// 모델 정의
const CertificateModel = mongoose.model('Certificate', CertificateSchema);

module.exports = CertificateModel;

// services/CertificateService.js
const Certificate = require('../models/Certificate');

class CertificateService {
  // 자격증 추가
  static async addCertificate(data) {
    try {
      const certificate = new Certificate(data);
      await certificate.save();
      return certificate;
    } catch (error) {
      throw new Error('자격증 추가 중 오류가 발생했습니다.');
    }
  }

  // 자격증 정보 조회
  static async getCertificateById(certificateId) {
    try {
      const certificate = await Certificate.findById(certificateId).populate('author');
      if (!certificate) {
        throw new Error('해당 ID의 자격증을 찾을 수 없습니다.');
      }
      return certificate;
    } catch (error) {
      throw new Error('자격증 조회 중 오류가 발생했습니다.');
    }
  }

  // 자격증 정보 수정
  static async updateCertificate(certificateId, updateData) {
    try {
      const certificate = await Certificate.findByIdAndUpdate(
        certificateId,
        updateData,
        { new: true }
      );
      if (!certificate) {
        throw new Error('해당 ID의 자격증을 찾을 수 없습니다.');
      }
      return certificate;
    } catch (error) {
      throw new Error('자격증 수정 중 오류가 발생했습니다.');
    }
  }

  // 자격증 삭제 (논리 삭제)
  static async deleteCertificate(certificateId) {
    try {
      const certificate = await Certificate.findByIdAndUpdate(
        certificateId,
        { deletedAt: new Date() },
        { new: true }
      );
      if (!certificate) {
        throw new Error('해당 ID의 자격증을 찾을 수 없습니다.');
      }
      return { message: '자격증 삭제 성공' };
    } catch (error) {
      throw new Error('자격증 삭제 중 오류가 발생했습니다.');
    }
  }
}

module.exports = CertificateService;
*/