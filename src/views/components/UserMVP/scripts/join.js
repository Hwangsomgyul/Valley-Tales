const userInfo = [];
const joinForm = document.getElementById("join-form");
let passwordMessage = document.getElementById("pw-check-message");
const [
  joinInputEmail,
  joinInputDomain,
  joinInputPass1,
  joinInputPass2,
  joinInputName,
  joinButton,
] = document.querySelectorAll("[id^=join-]");

// 폼 제출 시 api 요청
function onJoinSubmit(event) {
  event.preventDefault();
  console.log("회원가입 제출");

  // 빈칸 경고, 비밀번호 일치 확인
  if (joinInputEmail.value === "" || joinInputDomain.value === "") {
    return alert("이메일을 입력해주세요!");
  } else if (joinInputPass1.value === "") {
    return alert("비밀번호를 입력해주세요!");
  } else if (joinInputPass2.value === "") {
    return alert("비밀번호 확인을 입력해주세요!");
  } else if (passwordMessage) {
    return alert("비밀번호를 다시 확인해주세요!");
  }

  const joinEmail = joinInputEmail.value + joinInputDomain.value;
  const joinPassword = joinInputPass1.value;
  const joinName = joinInputName.value;
  userInfo = { joinEmail, joinPassword, joinName };

  console.log(joinEmail);
  console.log(password1);
  console.log(password2);
  console.log(joinName);
  console.log(userInfo);

  // fetch post API 요청
}

// 비밀번호 확인 칸 change event
function checkPassword() {
  if (joinInputPass1.value === joinInputPass2.value) {
    passwordMessage.innerText = "비밀번호가 일치합니다!";
  } else {
    passwordMessage.innerText = "";
  }
  return;
}

joinForm.addEventListener("submit", onJoinSubmit);
joinInputPass2.addEventListener("change", checkPassword);
