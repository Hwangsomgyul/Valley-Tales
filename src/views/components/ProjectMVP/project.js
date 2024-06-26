// project.js
import { showElement, hideElement } from "../utils.js";

const addProjectBtn = document.getElementById("addProjectBtn");
const projectForm = document.getElementById("projectForm");
const projectNameInput = document.getElementById("projectName");
const projectDescriptionInput = document.getElementById("projectDescription");
const projectList = [];
let projectEditingIndex = -1;
const initializeProjectForm = () => {
  clearProjectForm();
  toggleProjectForm();
};
addProjectBtn.addEventListener("click", () => {
  projectEditingIndex = -1;
  initializeProjectForm();
});

document.getElementById("projectCancelBtn").addEventListener("click", () => {
  initializeProjectForm();
});

document.getElementById("projectConfirmBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (projectNameInput.value && projectDescriptionInput.value) {
    if (projectEditingIndex === -1) {
      projectList.push({
        name: projectNameInput.value,
        description: projectDescriptionInput.value,
      });
    } else {
      projectList[projectEditingIndex] = {
        name: projectNameInput.value,
        description: projectDescriptionInput.value,
      };
      projectEditingIndex = -1;
    }

    updateProjectList();
    initializeProjectForm();
  } else {
    alert("모든 필드를 입력해 주세요.");
  }
});

function updateProjectList() {
  const fragment = document.createDocumentFragment();
  const projectListDiv = document.getElementById("projectList");
  projectListDiv.innerHTML = "";

  projectList.forEach((item, index) => {
    const projectItemDiv = document.createElement("div");
    projectItemDiv.className = "project-item";

    const projectText = document.createElement("span");
    projectText.innerText = `${item.name} - ${item.description}`;
    projectItemDiv.appendChild(projectText);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    editBtn.innerText = "편집";
    editBtn.addEventListener("click", () => {
      editProject(index);
    });
    projectItemDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn btn btn-link";
    deleteBtn.innerText = "삭제";
    deleteBtn.addEventListener("click", () => {
      deleteProject(index);
    });
    projectItemDiv.appendChild(deleteBtn);

    fragment.appendChild(projectItemDiv);
  });
  projectListDiv.appendChild(fragment);
}

function editProject(index) {
  projectEditingIndex = index;
  const item = projectList[index];
  projectNameInput.value = item.name;
  projectDescriptionInput.value = item.description;
  toggleProjectForm(true);
}

function deleteProject(index) {
  projectList.splice(index, 1);
  updateProjectList();
}

function clearProjectForm() {
  projectNameInput.value = "";
  projectDescriptionInput.value = "";
}

function toggleProjectForm(forceOpen = false) {
  if (forceOpen) {
    showElement(projectForm);
  } else {
    projectForm.style.display =
      projectForm.style.display === "block" ? "none" : "block";
  }
}

// 프로젝트 조회 함수
const getProjects = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/projects`, {
      method: "GET",
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

// 프로젝트 추가 함수
const addProject = async (userId, projectData) => {
  try {
    const response = await fetch(`/api/users/${userId}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};
