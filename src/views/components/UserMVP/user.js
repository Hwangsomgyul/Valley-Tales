// 공통 함수
function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

// 프로필 수정 기능
const editProfileBtn = document.getElementById('editProfileBtn');
const profileButtons = document.getElementById('profileButtons');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const bioInput = document.getElementById('bioInput');
const nameText = document.getElementById('nameText');
const emailText = document.getElementById('emailText');
const bioText = document.getElementById('bioText');
const profileImage = document.getElementById('profileImage');
const imageURLInput = document.getElementById('imageURLInput');
const imageFileInput = document.getElementById('imageFileInput');
const imagePreview = document.getElementById('imagePreview');

editProfileBtn.addEventListener('click', () => {
    nameInput.value = nameText.innerText;
    emailInput.value = emailText.innerText;
    bioInput.value = bioText.innerText;

    showElement(nameInput);
    showElement(emailInput);
    showElement(bioInput);
    showElement(imageURLInput);
    showElement(imageFileInput);
    showElement(imagePreview);
    showElement(profileButtons);
    hideElement(editProfileBtn);
});

document.getElementById('profileConfirmBtn').addEventListener('click', () => {
    if (nameInput.value) {
        nameText.innerText = nameInput.value;
    }
    if (emailInput.value) {
        emailText.innerText = emailInput.value;
    }
    if (bioInput.value) {
        bioText.innerText = bioInput.value;
    }

    if (imageURLInput.value) {
        profileImage.src = imageURLInput.value;
    }

    hideProfileEdit();
});

document.getElementById('profileCancelBtn').addEventListener('click', () => {
    hideProfileEdit();
});

imageFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        profileImage.src = e.target.result;
        imagePreview.src = e.target.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
});

function hideProfileEdit() {
    hideElement(nameInput);
    hideElement(emailInput);
    hideElement(bioInput);
    hideElement(imageURLInput);
    hideElement(imageFileInput);
    hideElement(imagePreview);
    hideElement(profileButtons);
    showElement(editProfileBtn);
}

// 학력 추가 및 수정 기능
const addEducationBtn = document.getElementById('addEducationBtn');
const educationForm = document.getElementById('educationForm');
const schoolNameInput = document.getElementById('schoolName');
const majorInput = document.getElementById('major');
const educationList = [];
let educationEditingIndex = -1;

addEducationBtn.addEventListener('click', () => {
    educationEditingIndex = -1;
    clearEducationForm();
    toggleEducationForm();
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    clearEducationForm();
    toggleEducationForm();
});

document.getElementById('confirmBtn').addEventListener('click', () => {
    const degreeElement = document.querySelector('input[name="degree"]:checked');
    const degree = degreeElement ? degreeElement.value : '';

    if (schoolNameInput.value && majorInput.value && degree) {
        if (educationEditingIndex === -1) {
            educationList.push({
                schoolName: schoolNameInput.value,
                major: majorInput.value,
                degree: degree
            });
        } else {
            educationList[educationEditingIndex] = {
                schoolName: schoolNameInput.value,
                major: majorInput.value,
                degree: degree
            };
            educationEditingIndex = -1;
        }

        updateEducationList();
        clearEducationForm();
        toggleEducationForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateEducationList() {
    const educationListDiv = document.getElementById('educationList');
    educationListDiv.innerHTML = '';

    educationList.forEach((item, index) => {
        const educationItemDiv = document.createElement('div');
        educationItemDiv.className = 'education-item';
        
        const educationText = document.createElement('span');
        educationText.innerText = `${item.schoolName} ${item.major} (${item.degree})`;
        educationItemDiv.appendChild(educationText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editEducation(index);
        });
        educationItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteEducation(index);
        });
        educationItemDiv.appendChild(deleteBtn);

        educationListDiv.appendChild(educationItemDiv);
    });
}

function editEducation(index) {
    educationEditingIndex = index;
    const item = educationList[index];
    schoolNameInput.value = item.schoolName;
    majorInput.value = item.major;
    const degrees = document.getElementsByName('degree');
    degrees.forEach(degree => {
        degree.checked = (degree.value === item.degree);
    });
    toggleEducationForm(true);
}

function deleteEducation(index) {
    educationList.splice(index, 1);
    updateEducationList();
}

function clearEducationForm() {
    schoolNameInput.value = '';
    majorInput.value = '';
    const degrees = document.getElementsByName('degree');
    degrees.forEach(degree => {
        degree.checked = false;
    });
}

function toggleEducationForm(forceOpen = false) {
    if (forceOpen) {
        showElement(educationForm);
    } else {
        educationForm.style.display = educationForm.style.display === 'block' ? 'none' : 'block';
    }
}

// 수상이력 추가 및 수정 기능
const addAwardBtn = document.getElementById('addAwardBtn');
const awardForm = document.getElementById('awardForm');
const awardHistoryInput = document.getElementById('awardHistory');
const organizationInput = document.getElementById('organization');
const awardDateInput = document.getElementById('awardDate');
const awardList = [];
let awardEditingIndex = -1;

addAwardBtn.addEventListener('click', () => {
    awardEditingIndex = -1;
    clearAwardForm();
    toggleAwardForm();
});

document.getElementById('cancelBtn2').addEventListener('click', () => {
    clearAwardForm();
    toggleAwardForm();
});

document.getElementById('confirmBtn2').addEventListener('click', () => {
    if (awardHistoryInput.value && organizationInput.value && awardDateInput.value) {
        if (awardEditingIndex === -1) {
            awardList.push({
                awardHistory: awardHistoryInput.value,
                organization: organizationInput.value,
                awardDate: awardDateInput.value
            });
        } else {
            awardList[awardEditingIndex] = {
                awardHistory: awardHistoryInput.value,
                organization: organizationInput.value,
                awardDate: awardDateInput.value
            };
            awardEditingIndex = -1;
        }

        updateAwardList();
        clearAwardForm();
        toggleAwardForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateAwardList() {
    const awardListDiv = document.getElementById('awardList');
    awardListDiv.innerHTML = '';

    awardList.forEach((item, index) => {
        const awardItemDiv = document.createElement('div');
        awardItemDiv.className = 'award-item';
        
        const awardText = document.createElement('span');
        awardText.innerText = `${item.awardHistory} ${item.organization} ${item.awardDate}`;
        awardItemDiv.appendChild(awardText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editAward(index);
        });
        awardItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteAward(index);
        });
        awardItemDiv.appendChild(deleteBtn);

        awardListDiv.appendChild(awardItemDiv);
    });
}

function editAward(index) {
    awardEditingIndex = index;
    const item = awardList[index];
    awardHistoryInput.value = item.awardHistory;
    organizationInput.value = item.organization;
    awardDateInput.value = item.awardDate;
    toggleAwardForm(true);
}

function deleteAward(index) {
    awardList.splice(index, 1);
    updateAwardList();
}

function clearAwardForm() {
    awardHistoryInput.value = '';
    organizationInput.value = '';
    awardDateInput.value = '';
}

function toggleAwardForm(forceOpen = false) {
    if (forceOpen) {
        showElement(awardForm);
    } else {
        awardForm.style.display = awardForm.style.display === 'block' ? 'none' : 'block';
    }
}

// 프로젝트 추가 및 수정 기능
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

document.getElementById('projectConfirmBtn').addEventListener('click', () => {
    if (projectNameInput.value && projectDescriptionInput.value) {
        if (projectEditingIndex === -1) {
            projectList.push({
                name: projectNameInput.value,
                description: projectDescriptionInput.value
            });
        } else {
            projectList[projectEditingIndex] = {
                name: projectNameInput.value,
                description: projectDescriptionInput.value
            };
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
        deleteBtn.addEventListener('click', () => {
            deleteProject(index);
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

function deleteProject(index) {
    projectList.splice(index, 1);
    updateProjectList();
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

// 자격증 추가 및 수정 기능
const addCertificateBtn = document.getElementById('addCertificateBtn');
const certificateForm = document.getElementById('certificateForm');
const certificateNameInput = document.getElementById('certificateName');
const certificateOrganizationInput = document.getElementById('certificateOrganization');
const certificateDateInput = document.getElementById('certificateDate');
const certificateList = [];
let certificateEditingIndex = -1;

addCertificateBtn.addEventListener('click', () => {
    certificateEditingIndex = -1;
    clearCertificateForm();
    toggleCertificateForm();
});

document.getElementById('certificateCancelBtn').addEventListener('click', () => {
    clearCertificateForm();
    toggleCertificateForm();
});

document.getElementById('certificateConfirmBtn').addEventListener('click', () => {
    if (certificateNameInput.value && certificateOrganizationInput.value && certificateDateInput.value) {
        if (certificateEditingIndex === -1) {
            certificateList.push({
                name: certificateNameInput.value,
                organization: certificateOrganizationInput.value,
                date: certificateDateInput.value
            });
        } else {
            certificateList[certificateEditingIndex] = {
                name: certificateNameInput.value,
                organization: certificateOrganizationInput.value,
                date: certificateDateInput.value
            };
            certificateEditingIndex = -1;
        }

        updateCertificateList();
        clearCertificateForm();
        toggleCertificateForm();
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

function updateCertificateList() {
    const certificateListDiv = document.getElementById('certificateList');
    certificateListDiv.innerHTML = '';

    certificateList.forEach((item, index) => {
        const certificateItemDiv = document.createElement('div');
        certificateItemDiv.className = 'certificate-item';
        
        const certificateText = document.createElement('span');
        certificateText.innerText = `${item.name} - ${item.organization} - ${item.date}`;
        certificateItemDiv.appendChild(certificateText);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn btn btn-link';
        editBtn.innerText = '편집';
        editBtn.addEventListener('click', () => {
            editCertificate(index);
        });
        certificateItemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-link';
        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteCertificate(index);
        });
        certificateItemDiv.appendChild(deleteBtn);

        certificateListDiv.appendChild(certificateItemDiv);
    });
}

function editCertificate(index) {
    certificateEditingIndex = index;
    const item = certificateList[index];
    certificateNameInput.value = item.name;
    certificateOrganizationInput.value = item.organization;
    certificateDateInput.value = item.date;
    toggleCertificateForm(true);
}

function deleteCertificate(index) {
    certificateList.splice(index, 1);
    updateCertificateList();
}

function clearCertificateForm() {
    certificateNameInput.value = '';
    certificateOrganizationInput.value = '';
    certificateDateInput.value = '';
}

function toggleCertificateForm(forceOpen = false) {
    if (forceOpen) {
        showElement(certificateForm);
    } else {
        certificateForm.style.display = certificateForm.style.display === 'block' ? 'none' : 'block';
    }
}
