// certificate.js
import { showElement, hideElement } from "../utils.js";

const addCertificateBtn = document.getElementById("addCertificateBtn");
const certificateForm = document.getElementById("certificateForm");
const certificateNameInput = document.getElementById("certificateName");
const certificateOrganizationInput = document.getElementById(
  "certificateOrganization"
);
const certificateDateInput = document.getElementById("certificateDate");
const certificateList = [];
let certificateEditingIndex = -1;

const initializeCertificateForm = () => {
  clearCertificateForm();
  toggleCertificateForm();
};
addCertificateBtn.addEventListener("click", () => {
  certificateEditingIndex = -1;
  initializeCertificateForm();
});

document
  .getElementById("certificateCancelBtn")
  .addEventListener("click", () => {
    initializeCertificateForm();
  });

document
  .getElementById("certificateConfirmBtn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    if (
      certificateNameInput.value &&
      certificateOrganizationInput.value &&
      certificateDateInput.value
    ) {
      if (certificateEditingIndex === -1) {
        certificateList.push({
          name: certificateNameInput.value,
          certificateOrganization: certificateOrganizationInput.value,
          date: certificateDateInput.value,
        });
      } else {
        certificateList[certificateEditingIndex] = {
          name: certificateNameInput.value,
          certificateOrganization: certificateOrganizationInput.value,
          date: certificateDateInput.value,
        };
        certificateEditingIndex = -1;
      }

      updateCertificateList();
      initializeCertificateForm();
    } else {
      alert("모든 필드를 입력해 주세요.");
    }
  });

function updateCertificateList() {
  const fragment = document.createDocumentFragment();
  const certificateListDiv = document.getElementById("certificateList");
  certificateListDiv.innerHTML = "";

  certificateList.forEach((item, index) => {
    const certificateItemDiv = document.createElement("div");
    certificateItemDiv.className = "certificate-item";

    const certificateText = document.createElement("span");
    certificateText.innerText = `${item.name} - ${item.certificateOrganization} - ${item.date}`;
    certificateItemDiv.appendChild(certificateText);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    editBtn.innerText = "편집";
    editBtn.addEventListener("click", () => {
      editCertificate(index);
    });
    certificateItemDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn btn btn-link";
    deleteBtn.innerText = "삭제";
    deleteBtn.addEventListener("click", () => {
      deleteCertificate(index);
    });
    certificateItemDiv.appendChild(deleteBtn);

    fragment.appendChild(certificateItemDiv);
  });
  certificateListDiv.appendChild(fragment);
}

function editCertificate(index) {
  certificateEditingIndex = index;
  const item = certificateList[index];
  certificateNameInput.value = item.name;
  certificateOrganizationInput.value = item.certificateOrganization;
  certificateDateInput.value = item.date;
  toggleCertificateForm(true);
}

function deleteCertificate(index) {
  certificateList.splice(index, 1);
  updateCertificateList();
}

function clearCertificateForm() {
  certificateNameInput.value = "";
  certificateOrganizationInput.value = "";
  certificateDateInput.value = "";
}

function toggleCertificateForm(forceOpen = false) {
  if (forceOpen) {
    showElement(certificateForm);
  } else {
    certificateForm.style.display =
      certificateForm.style.display === "block" ? "none" : "block";
  }
}

// 자격증 조회 함수
const getCertificates = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/certificates`, {
      method: "GET",
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

// 자격증 추가 함수
const addCertificate = async (userId, certificateData) => {
  try {
    const response = await fetch(`/api/users/${userId}/certificates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(certificateData),
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};
