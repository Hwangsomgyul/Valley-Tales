const loginForm = document.getElementById("login-form");
const loginInputEmail = document.getElementById("login-email");
const loginInputPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-btn");
const joinButton = document.getElementById("join-btn-at-login");

// 로그인 버튼 submit event
function onLoginSubmit(event) {
  event.preventDefault();
  console.log("로그인 제출");
  const loginEmail = loginInputEmail.value;
  const loginPassword = loginInputPassword.value;
  if (loginEmail === "") {
    return alert("이메일을 입력해주세요!");
  } else if (loginPassword === "") {
    return alert("비밀번호를 입력해주세요!");
  }
  console.log(loginEmail);
  console.log(loginPassword);
  fetchPostLogin(loginEmail, loginPassword);
}

function fetchPostLogin(loginEmail, loginPassword) {
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        console.log("response error");
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }
      return res.json();
    })
    // 로그인 응답 어떻게 들어오는지 보고 쓰기
    .then((res) => {
      if (res) {
        console.log(res);
      }
    });
}

loginForm.addEventListener("submit", onLoginSubmit);

// // text 정보만 사용 가능
// const nonBodyMethods = ["GET", "DELETE"];
// const baseApi = async (url, method, data = {}, headers) => {
//   const userId = localStorage.getItem("userId");
//   try {
//     if (nonBodyMethods.includes(method)) {
//       // GET, DELETE 요청이면 바디 없이 fetch
//       return await fetch(url, { method, headers });
//     }
//     // POST, PUT 요청이면 바디 있는 fetch
//     return await fetch(url, { method, body: JSON.stringify(data) });
//   } catch (err) {
//     console.log("login - try error");
//     console.log(err);
//   }
// };
