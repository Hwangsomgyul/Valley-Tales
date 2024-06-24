// const userInfo = {};
// import
const joinForm = document.getElementById("join-form");
let passwordMessage = document.getElementById("pw-check-message");
const [
  joinInputEmail,
  joinInputDomain,
  joinInputEmailCheck,
  joinInputPass1,
  joinInputPass2,
  joinInputName,
] = document.querySelectorAll("[name=join]");
const emailReqBtn = document.getElementById("email-reqbtn");
const emailResBtn = document.getElementById("email-resbtn");
const emailMessage = document.getElementById("email-check-message");

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
  } else if (passwordMessage.style.color !== "green") {
    return alert("비밀번호를 다시 확인해주세요!");
  } else if (joinInputName.value === "") {
    return alert("이름을 입력해주세요!");
  }

  const joinEmail = joinInputEmail.value + joinInputDomain.value;
  const joinPassword = joinInputPass1.value;
  const joinName = joinInputName.value;
  const userInfo = { joinEmail, joinPassword, joinName };

  console.log(userInfo);

  // fetch post API 요청
}

// 비밀번호 확인 칸 change event
function checkPassword() {
  console.log(`1:${joinInputPass1.value}   2:${joinInputPass2.value}`);
  if (joinInputPass1.value.length < 4) {
    passwordMessage.innerText =
      "비밀번호가 너무 짧습니다. 4글자 이상 입력해주세요.";
    passwordMessage.style.color = "red";
  } else if (joinInputPass1.value !== joinInputPass2.value) {
    passwordMessage.innerText = "비밀번호가 일치하지 않습니다.";
    passwordMessage.style.color = "gray";
  } else if (joinInputPass1.value === joinInputPass2.value) {
    passwordMessage.innerText = "비밀번호가 일치합니다!";
    passwordMessage.style.color = "green";
  }
  return;
}

joinForm.addEventListener("submit", onJoinSubmit);
joinInputPass1.addEventListener("input", checkPassword);
joinInputPass2.addEventListener("input", checkPassword);
