// project.js
import { showElement, hideElement } from './utils.js';

const addProjectBtn = document.getElementById('addProjectBtn');
const projectForm = document.getElementById('projectForm');
const projectNameInput = document.getElementById('projectName');
const projectDescriptionInput = document.getElementById('projectDescription');
const projectList = [];
let projectEditingIndex = -1;

addProjectBtn.addEventListener('click', () => {
    projectEditingIndex = -1;
    clearProjectForm();
    toggleProjectForm();
});

document.getElementById('projectCancelBtn').addEventListener('click', () => {
    clearProjectForm();
    toggleProjectForm();
});

document.getElementById('projectConfirmBtn').addEventListener('click', async () => {
    if (projectNameInput.value && projectDescriptionInput.value) {
        const projectData = {
            name: projectNameInput.value,
            description: projectDescriptionInput.value
        };

        if (projectEditingIndex === -1) {
            await addProject(projectData);
        } else {
            const id = projectList[projectEditingIndex].id; // Assuming each project item has a unique ID
            await updateProject(id, projectData);
            projectEditingIndex = -1;
        }

        updateProjectList();
        clearProjectForm();
        toggleProjectForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateProjectList() {
    const projectListDiv = document.getElementById('projectList');
    projectListDiv.innerHTML = '';

    projectList.forEach((item, index) => {
        const projectItemDiv = document.createElement('div');
        projectItemDiv.className = 'project-item';
        
        const projectText = document.createElement('span');
        projectText.innerText = `${item.name} - ${item.description}`;
        projectItemDiv.appendChild(projectText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editProject(index);
        });
        projectItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', async () => {
            const id = projectList[index].id; // Assuming each project item has a unique ID
            await deleteProject(id);
            projectList.splice(index, 1);
            updateProjectList();
        });
        projectItemDiv.appendChild(deleteBtn);

        projectListDiv.appendChild(projectItemDiv);
    });
}

function editProject(index) {
    projectEditingIndex = index;
    const item = projectList[index];
    projectNameInput.value = item.name;
    projectDescriptionInput.value = item.description;
    toggleProjectForm(true);
}

// 프로젝트 삭제 함수
async function deleteProject(id) {
    try {
        await fetch(`/api/users/projects/${id}`, {
            method: 'DELETE',
            credentials: 'include' // 세션 쿠키 포함
        });
        const index = projectList.findIndex(item => item.id === id);
        if (index !== -1) {
            projectList.splice(index, 1);
            updateProjectList();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function clearProjectForm() {
    projectNameInput.value = '';
    projectDescriptionInput.value = '';
}

function toggleProjectForm(forceOpen = false) {
    if (forceOpen) {
        showElement(projectForm);
    } else {
        projectForm.style.display = projectForm.style.display === 'block' ? 'none' : 'block';
    }
}

// 프로젝트 조회 함수
const getProjects = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}/projects`, {
            method: 'GET',
            credentials: 'include' // 세션 쿠키 포함
        });
        const result = await response.json();
        projectList.splice(0, projectList.length, ...result); // Update local list
        updateProjectList();
    } catch (error) {
        console.error('Error:', error);
    }
};

// 프로젝트 추가 함수
const addProject = async (projectData) => {
    try {
        const response = await fetch(`/api/users/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
            credentials: 'include' // 세션 쿠키 포함
        });
        const result = await response.json();
        projectList.push(result);
        updateProjectList();
    } catch (error) {
        console.error('Error:', error);
    }
};

// 프로젝트 수정 함수
const updateProject = async (id, projectData) => {
    try {
        const response = await fetch(`/api/users/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
            credentials: 'include' // 세션 쿠키 포함
        });
        const result = await response.json();
        const index = projectList.findIndex(item => item.id === id);
        if (index !== -1) {
            projectList[index] = result;
        }
        updateProjectList();
    } catch (error) {
        console.error('Error:', error);
    }
};
