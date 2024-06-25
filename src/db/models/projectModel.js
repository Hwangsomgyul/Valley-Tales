// models/Project.js
const mongoose = require('mongoose');
const projectSchema = require('../schemas/Project');

//커스텀 에러
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// 모델 정의
const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;

// services/ProjectService.js
const Project = require('../models/Project');
const CustomError = require('../errors/CustomError');

class ProjectService {
  // 프로젝트 추가
  static async addProject(data) {
    const project = new Project(data);
    try {
      await project.save();
      return project;
    } catch (error) {
      throw new CustomError(400, '프로젝트 추가 중 오류가 발생했습니다: ' + error.message);
    }
  }

  // 프로젝트 정보 조회
  static async getProjectById(projectId) {
    const project = await Project.findById(projectId).populate('author');
    if (!project) {
      throw new CustomError(404, '해당 ID의 프로젝트를 찾을 수 없습니다.');
    }
    return project;
  }

  // 프로젝트 정보 수정
  static async updateProject(projectId, updateData) {
    const project = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    );
    if (!project) {
      throw new CustomError(404, '해당 ID의 프로젝트를 찾을 수 없습니다.');
    }
    return project;
  }

  // 프로젝트 삭제 (논리 삭제)
  static async deleteProject(projectId) {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!project) {
      throw new CustomError(404, '해당 ID의 프로젝트를 찾을 수 없습니다.');
    }
    return { message: '프로젝트 삭제 성공' };
  }
}

module.exports = ProjectService;


/*
// models/Project.js
const mongoose = require('mongoose');
const projectSchema = require('../schemas/Project');

// 모델 정의
const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;

// services/ProjectService.js
const Project = require('../models/Project');

class ProjectService {
  // 프로젝트 추가
  static async addProject(data) {
    try {
      const project = new Project(data);
      await project.save();
      return project;
    } catch (error) {
      throw new Error('프로젝트 추가 중 오류가 발생했습니다.');
    }
  }

  // 프로젝트 정보 조회
  static async getProjectById(projectId) {
    try {
      const project = await Project.findById(projectId).populate('author');
      if (!project) {
        throw new Error('해당 ID의 프로젝트를 찾을 수 없습니다.');
      }
      return project;
    } catch (error) {
      throw new Error('프로젝트 조회 중 오류가 발생했습니다.');
    }
  }

  // 프로젝트 정보 수정
  static async updateProject(projectId, updateData) {
    try {
      const project = await Project.findByIdAndUpdate(
        projectId,
        updateData,
        { new: true }
      );
      if (!project) {
        throw new Error('해당 ID의 프로젝트를 찾을 수 없습니다.');
      }
      return project;
    } catch (error) {
      throw new Error('프로젝트 수정 중 오류가 발생했습니다.');
    }
  }

  // 프로젝트 삭제 (논리 삭제)
  static async deleteProject(projectId) {
    try {
      const project = await Project.findByIdAndUpdate(
        projectId,
        { deletedAt: new Date() },
        { new: true }
      );
      if (!project) {
        throw new Error('해당 ID의 프로젝트를 찾을 수 없습니다.');
      }
      return { message: '프로젝트 삭제 성공' };
    } catch (error) {
      throw new Error('프로젝트 삭제 중 오류가 발생했습니다.');
    }
  }
}

module.exports = ProjectService;
*/