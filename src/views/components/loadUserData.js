// loadUserData.js

document.addEventListener('DOMContentLoaded', () => {
   
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (!userId) {
        console.error('userId가 URL에 없습니다.');
        return;
    }

    
    fetch(`/api/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            
            updateProfileSection(data);
            updateEducationSection(data.education);
            updateAwardSection(data.awards);
            updateProjectSection(data.projects);
            updateCertificateSection(data.certificates);
        })
        .catch(error => console.error('Error fetching user data:', error));
});

function updateProfileSection(data) {
    document.getElementById('profileImage').src = data.profileImage || 'https://cataas.com/cat';
    document.getElementById('nameText').textContent = data.name || '이름 없음';
    document.getElementById('emailText').textContent = data.email || '이메일 없음';
    document.getElementById('bioText').textContent = data.bio || '설명이 아직 없습니다. 추가해 주세요.';
}

function updateEducationSection(education) {
    const educationList = document.getElementById('educationList');
    educationList.innerHTML = '';

    education.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('education-item');
        div.innerHTML = `
            <h5>${item.schoolName}</h5>
            <p>${item.major}</p>
            <p>${item.degree}</p>
            <p>${item.startDate} ~ ${item.endDate}</p>
        `;
        educationList.appendChild(div);
    });
}

function updateAwardSection(awards) {
    const awardList = document.getElementById('awardList');
    awardList.innerHTML = '';

    awards.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('award-item');
        div.innerHTML = `
            <h5>${item.awardHistory}</h5>
            <p>${item.organization}</p>
            <p>${item.awardDate}</p>
        `;
        awardList.appendChild(div);
    });
}

function updateProjectSection(projects) {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';

    projects.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('project-item');
        div.innerHTML = `
            <h5>${item.projectName}</h5>
            <p>${item.projectDescription}</p>
        `;
        projectList.appendChild(div);
    });
}

function updateCertificateSection(certificates) {
    const certificateList = document.getElementById('certificateList');
    certificateList.innerHTML = '';

    certificates.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('certificate-item');
        div.innerHTML = `
            <h5>${item.certificateName}</h5>
            <p>${item.certificateOrganization}</p>
            <p>${item.certificateDate}</p>
        `;
        certificateList.appendChild(div);
    });
}
