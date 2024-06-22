const { model } = require('mongoose');
const projectSchema = require('../schemas/Project');
const ProjectModel = model('Project', projectSchema);

module.exports = ProjectModel;



/*
const mongoose = require('mongoose');
const ProjectSchema = require('../schemas/Project'); // Project 스키마를 정의한 파일 경로

// 모델 정의
const ProjectModel = mongoose.model('Project', ProjectSchema);

// Project 클래스 정의
class Project {
  static async create(newProject) {
    const createdProject = await ProjectModel.create(newProject);
    return createdProject;
  }

  static async findById(projectId) {
    const project = await ProjectModel.findById(projectId);
    return project;
  }

  static async findAll() {
    const projects = await ProjectModel.find({});
    return projects;
  }

  static async update(projectId, newValues) {
    const filter = { _id: projectId }; //id값이 일치하는 문서를 찿음
    const update = { $set: newValues }; // $set 연산자를 사용하여 문서의 특정 필드를 newValues로 설정
    const options = { new: true }; //옵션은 업데이트 후의 문서를 반환하도록 설정

    const updatedProject = await ProjectModel.findByIdAndUpdate(filter, update, options);
    return updatedProject;
  }

  static async delete(projectId) {
    await ProjectModel.findByIdAndDelete(projectId);
    return '삭제가 완료되었습니다.';
  }
}

module.exports = Project;
*/