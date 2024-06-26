// loadUserData.js

//userId 가져오기
export const getUserId = () => {
  const path = window.location.pathname;
  const segments = path.split("/");
  return segments[2];
};

export function loadUserData(userId) {
  // 사용자 정보 가져오기
  fetch(`/api/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      updateProfileSection(data);
    })
    .catch((error) => console.error("Error fetching user data:", error));

  // 교육 정보 가져오기
  fetch(`/api/educations/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      updateEducationSection(data);
    })
    .catch((error) => console.error("Error fetching education data:", error));

  // 수상 이력 정보 가져오기
  fetch(`/api/awards/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      updateAwardSection(data);
    })
    .catch((error) => console.error("Error fetching award data:", error));

  // 프로젝트 정보 가져오기
  fetch(`/api/project/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      updateProjectSection(data);
    })
    .catch((error) => console.error("Error fetching project data:", error));

  // 자격증 정보 가져오기
  fetch(`/api/certificate/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      updateCertificateSection(data);
    })
    .catch((error) => console.error("Error fetching certificate data:", error));
}

function updateProfileSection(data) {
  // 여기에 canEdit로 편집 버튼 숨기기 넣을까요
  document.getElementById("profileImage").src = data.profileImage
    ? data.profileImage
    : "https://cataas.com/cat";
  document.getElementById("nameText").innerText = data.name || "이름 없음";
  document.getElementById("emailText").innerText = data.email || "이메일 없음";
  document.getElementById("bioText").innerText =
    data.description || "설명이 아직 없습니다. 추가해 주세요.";
}

function updateEducationSection(education) {
  const educationList = document.getElementById("educationList");
  educationList.innerHTML = "";

  education.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("education-item");

    //dataset으로 eduId 부여
    //div 태그의 속성으로 data-id-{educationId} 붙음
    div.dataset.id = item.educationId;

    const schoolName = document.createElement("h5");
    schoolName.innerText = item.school;
    const major = document.createElement("p");
    major.innerText = item.major;
    const degree = document.createElement("p");
    degree.innerText = item.degree;
    const dates = document.createElement("p");

    // 날짜 표기 변경 (엄청 길게 나와서 앞부터 10개 자름)
    const startRaw = item.startDate;
    const start = startRaw.substr(0, 10);
    const endRaw = item.endDate;
    const end = endRaw.substr(0, 10);
    dates.innerText = `${start} ~ ${end}`;

    div.appendChild(schoolName);
    div.appendChild(major);
    div.appendChild(degree);
    div.appendChild(dates);
    educationList.appendChild(div);
  });
}

function updateAwardSection(awards) {
  const awardList = document.getElementById("awardList");
  awardList.innerHTML = "";

  awards.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("award-item");
    const awardHistory = document.createElement("h5");
    awardHistory.innerText = item.awardHistory;
    const organization = document.createElement("p");
    organization.innerText = item.organization;
    const awardDate = document.createElement("p");
    awardDate.innerText = item.awardDate;

    div.appendChild(awardHistory);
    div.appendChild(organization);
    div.appendChild(awardDate);
    awardList.appendChild(div);
  });
}

function updateProjectSection(projects) {
  const projectList = document.getElementById("projectList");
  projectList.innerHTML = "";

  projects.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("project-item");
    const projectName = document.createElement("h5");
    projectName.innerText = item.projectName;
    const projectDescription = document.createElement("p");
    projectDescription.innerText = item.projectDescription;

    div.appendChild(projectName);
    div.appendChild(projectDescription);
    projectList.appendChild(div);
  });
}

function updateCertificateSection(certificates) {
  const certificateList = document.getElementById("certificateList");
  certificateList.innerHTML = "";

  certificates.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("certificate-item");
    const certificateName = document.createElement("h5");
    certificateName.innerText = item.certificateName;
    const certificateOrganization = document.createElement("p");
    certificateOrganization.innerText = item.certificateOrganization;
    const certificateDate = document.createElement("p");
    certificateDate.innerText = item.certificateDate;

    div.appendChild(certificateName);
    div.appendChild(certificateOrganization);
    div.appendChild(certificateDate);
    certificateList.appendChild(div);
  });
}
