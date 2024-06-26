// award.js
import { showElement, hideElement } from "../utils.js";

const [
  addAwardBtn,
  awardForm,
  awardHistoryInput,
  organizationInput,
  awardDateInput,
] = document.querySelectorAll("[id^=award-form]");
const awardList = [];
let awardEditingIndex = -1;
const initializeAwardForm = () => {
  clearAwardForm();
  toggleAwardForm();
};
addAwardBtn.addEventListener("click", () => {
  awardEditingIndex = -1;
  initializeAwardForm();
});

document.getElementById("awardCancelBtn").addEventListener("click", (e) => {
  e.preventDefault();
  initializeAwardForm();
});

document.getElementById("awardConfirmBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (
    awardHistoryInput.value &&
    organizationInput.value &&
    awardDateInput.value
  ) {
    if (awardEditingIndex === -1) {
      awardList.push({
        awardHistory: awardHistoryInput.value,
        organization: organizationInput.value,
        awardDate: awardDateInput.value,
      });
    } else {
      awardList[awardEditingIndex] = {
        awardHistory: awardHistoryInput.value,
        organization: organizationInput.value,
        awardDate: awardDateInput.value,
      };
      awardEditingIndex = -1;
    }

    updateAwardList();
    initializeAwardForm();
  } else {
    alert("모든 필드를 입력해 주세요.");
  }
});

function updateAwardList() {
  const awardListDiv = document.getElementById("awardList");
  awardListDiv.innerHTML = "";

  const fragment = document.createDocumentFragment();

  awardList.forEach((item, index) => {
    const awardItemDiv = document.createElement("div");
    awardItemDiv.className = "award-item";

    const awardText = document.createElement("span");
    awardText.innerText = `${item.awardHistory} ${item.organization} ${item.awardDate}`;
    awardItemDiv.appendChild(awardText);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn btn btn-link";
    editBtn.innerText = "편집";
    editBtn.addEventListener("click", () => {
      editAward(index);
    });
    awardItemDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn btn btn-link";
    deleteBtn.innerText = "삭제";
    deleteBtn.addEventListener("click", () => {
      deleteAward(index);
    });
    awardItemDiv.appendChild(deleteBtn);

    fragment.appendChild(awardItemDiv);
  });

  awardListDiv.appendChild(fragment);
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
  awardHistoryInput.value = "";
  organizationInput.value = "";
  awardDateInput.value = "";
}

function toggleAwardForm(forceOpen = false) {
  if (forceOpen) {
    showElement(awardForm);
  } else {
    awardForm.style.display =
      awardForm.style.display === "block" ? "none" : "block";
  }
}

// 수상 조회 함수
const getAwards = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/awards`, {
      method: "GET",
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

// 수상 추가 함수
const addAward = async (userId, awardData) => {
  try {
    const response = await fetch(`/api/users/${userId}/awards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(awardData),
      credentials: "include", // 세션 쿠키 포함
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};
