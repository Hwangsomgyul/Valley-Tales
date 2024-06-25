// profile.js
import { showElement, hideElement } from "./utils.js";

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
    hideElement([nameInput, emailInput, bioInput, imageURLInput, imageFileInput, imagePreview, profileButtons]);
    showElement(editProfileBtn);
}
