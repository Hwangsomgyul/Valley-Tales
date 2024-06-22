const { model } = require('mongoose');
const educationSchema = require('../schemas/Education');
const EducationModel = model('Education', educationSchema);

module.exports = EducationModel;


/*
// models/Education.js
const mongoose = require('mongoose');
const EducationSchema = require('../schemas/EducationSchema'); // 스키마를 분리하여 사용
const EducationModel = mongoose.model('Education', EducationSchema);

class Education {
  constructor({ shortId, school, degree, startDate, endDate, deletedAt }) {
    this.shortId = shortId;
    this.school = school;
    this.degree = degree;
    this.startDate = startDate;
    this.endDate = endDate;
    this.deletedAt = deletedAt;
  }

  // 저장 메서드
  async save() {
    const education = new EducationModel({
      shortId: this.shortId,
      school: this.school,
      degree: this.degree,
      startDate: this.startDate,
      endDate: this.endDate,
      deletedAt: this.deletedAt,
    });

    await education.save();
    return education;
  }

  // 교육 데이터를 ID로 찾기 (static 메서드)
  static async findById(id) {
    return await EducationModel.findById(id);
  }

  // 교육 데이터를 shortId로 찾기 (static 메서드)
  static async findByShortId(shortId) {
    return await EducationModel.findOne({ shortId });
  }

  // 모든 교육 데이터를 찾기 (static 메서드)
  static async findAll() {
    return await EducationModel.find();
  }

  // 교육 데이터 업데이트 메서드
  async update() {
    const education = await EducationModel.findById(this.id);
    if (education) {
      education.school = this.school;
      education.degree = this.degree;
      education.startDate = this.startDate;
      education.endDate = this.endDate;
      education.deletedAt = this.deletedAt;
      await education.save();
      return education;
    }
    return null;
  }

  // 교육 데이터 삭제 메서드
  static async deleteById(id) {
    return await EducationModel.findByIdAndDelete(id);
  }
}

module.exports = Education;
*/