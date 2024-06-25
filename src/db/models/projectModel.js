// models/Project.js
const mongoose = require('mongoose');
const ProjectSchema = require('../schemas/Project');
const userModel = require('./userModel');

const { NotFoundError, ConflictError } = require('../../utils/customError');

//커스텀 에러
// class CustomError extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }

// 모델 정의
const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;

// services/ProjectService.js
// const Project = require('../models/Project');
// const CustomError = require('../errors/CustomError');

class ProjectService {
  // 프로젝트 추가
  static async addProject(data) {
    // const project = new Project(data);
    // try {
    //   await project.save();
    //   return project;
    // } catch (error) {
    //   throw new CustomError(400, '프로젝트 추가 중 오류가 발생했습니다: ' + error.message);
    // }
    const addedProject = await ProjectModel.create(data);
    if (!addedProject) {
      throw new Error('프로젝트 추가 중 오류가 발생했습니다.');
    }
    return addedProject;
  }

  // 프로젝트 정보 조회
  // static async getProjectById(projectId) {
  //   // const project = await Project.findById(projectId).populate('author');
  //   // if (!project) {
  //   //   throw new CustomError(404, '해당 ID의 프로젝트를 찾을 수 없습니다.');
  //   // }
  //   // return project;
  //   const foundProject = await ProjectModel.findOne({ projectId, deletedAt: { $exists: false } });
  //   if (!foundProject) {
  //     throw new NotFoundError('해당 ID의 프로젝트를 찾을 수 없습니다.');
  //   }
  //   return foundProject;
  // }
  static async getProject(projectId) {
    const foundProject = await ProjectModel.findOne({ projectId, deletedAt: { $exists: false }}).populate('author');
    if (!foundProject) {
      throw new NotFoundError('해당 프로젝트를 찾을 수 없습니다.');
    }
    return foundProject;
  }

  static async getAllProjectsById(userId) {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) {
      throw new NotFoundError('사용자가 존재하지 않습니다.');
    }
    const allProjects = await ProjectModel.find({ author: foundUser, deletedAt: { $exists: false }});
    return allProjects;
  }


  // 프로젝트 정보 수정
  static async updateProject(projectId, updateData) {
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { projectId, deletedAt: { $exists: false } },
      updateData,
      { new: true }
    );
    if (!updatedProject) {
      throw new NotFoundError('해당 ID의 프로젝트를 찾을 수 없습니다.');
    }
    return updatedProject;
  }

  // 프로젝트 삭제 (논리 삭제)
  static async deleteProject(projectId) {
    const deletedProject = await ProjectModel.findOneAndUpdate(
      { projectId, deletedAt: { $exists: false } },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedProject) {
      throw new NotFoundError('해당 ID의 프로젝트를 찾을 수 없습니다.');
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