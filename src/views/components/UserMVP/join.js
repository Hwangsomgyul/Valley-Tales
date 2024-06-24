users = [];

const joinForm = document.getElementById("join-form");
const passwordMessage = "";

// 폼 제출 시 api 요청
function onJoinSubmit(event) {
  event.preventDefault();
  console.log("회원가입 제출");

  // input 변수 할당
  const emailInput = document.getElementsByName("email")[0].value;
  const password1 = document.getElementsByName("password_1st")[0].value;
  const password2 = document.getElementsByName("password_2nd")[0].value;
  const joinNameInput = document.getElementsByName("user_name")[0].value;

  // 빈칸 경고, 비밀번호 일치 확인
  if (emailInput === "") {
    return alert("이메일을 입력해주세요!");
  } else if (password1 === "") {
    return alert("비밀번호를 입력해주세요!");
  } else if (passwordMessage !== "") {
    return alert("비밀번호가 일치하지 않습니다!");
  }

  console.log(emailInput);
  console.log(password1);
  console.log(password2);
  console.log(joinNameInput);

  // fetch post API 요청
}

// change 이벤트로 password1 password2 비교하는 함수 실행
// if (password1 !== password2) {
//   passwordMessage = "비밀번호가 일치하지 않습니다.";
//   // innerText 로 화면에 불일치문구 보이도록 할 예정
// } else if (password1 === password2) {
//   passwordMessage = "";
// }

joinForm.addEventListener("submit", onJoinSubmit);
