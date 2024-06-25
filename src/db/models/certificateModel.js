const Certificate = require('../models/Certificate');

//커스텀에러
class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class CertificateService {
  // 자격증 추가
  static async addCertificate(data) {
    const certificate = new Certificate(data);
    try {
      await certificate.save();
      return certificate;
    } catch (error) {
      throw new CustomError(400, '자격증 추가 중 오류가 발생했습니다: ' + error.message);
    }
  }

  // 자격증 정보 조회
  static async getCertificateById(certificateId) {
    try {
      const certificate = await Certificate.findById(certificateId).populate('author');
      if (!certificate) {
        throw new CustomError(404, '해당 ID의 자격증을 찾을 수 없습니다.');
      }
      return certificate;
    } catch (error) {
      throw new CustomError(400, '자격증 조회 중 오류가 발생했습니다: ' + error.message);
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
        throw new CustomError(404, '해당 ID의 자격증을 찾을 수 없습니다.');
      }
      return certificate;
    } catch (error) {
      throw new CustomError(400, '자격증 수정 중 오류가 발생했습니다: ' + error.message);
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
        throw new CustomError(404, '해당 ID의 자격증을 찾을 수 없습니다.');
      }
      return { message: '자격증 삭제 성공' };
    } catch (error) {
      throw new CustomError(400, '자격증 삭제 중 오류가 발생했습니다: ' + error.message);
    }
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