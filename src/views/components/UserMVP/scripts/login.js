const joinButton = document.getElementById("join-btn-at-login");

const [
  loginForm,
  loginInputEmail,
  loginInputDomain,
  loginInputPassword,
  loginButton,
] = document.querySelectorAll("[id^=login-]");

// 로그인 버튼 submit event
function onLoginSubmit(event) {
  event.preventDefault();
  console.log("로그인 제출");
  console.log(loginInputPassword.value);
  const loginEmail = loginInputEmail.value + loginInputDomain.value;
  const loginPassword = loginInputPassword.value;

  if (loginInputEmail.value === "" || loginInputDomain.value === "") {
    return alert("이메일을 입력해주세요!");
  } else if (loginPassword === "") {
    return alert("비밀번호를 입력해주세요!");
  }
  console.log(loginEmail);
  console.log(loginPassword);

  // api POST 요청
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
  }).then((res) => {
    console.log(res);
    if (res.redirected) {
      console.log("유저페이지로 이동");
      window.location.href = `/`;
      return;
    } else if (res.status === 400) {
      return alert(`error : 이메일 또는 비밀번호를 확인해 주세요!`);
    }
    return alert(`오류가 발생했습니다.`);
  });
}

loginForm.addEventListener("submit", onLoginSubmit);

// text 정보만 요청 baseApi
// const BASE_API_URL = "/api";
// const nonBodyMethods = ["GET", "DELETE"];
// const baseApi = async ({ url = "", method = "GET", data, headers = {} }) => {
//   // const userId = localStorage.getItem("userId");
//   const apiUrl = `${BASE_API_URL}/${url}`;
//   try {
//     if (nonBodyMethods.includes(method)) {
//       // GET, DELETE 요청이면 바디 없이 fetch
//       return await fetch(apiUrl, { method, headers });
//     } else {
//       // POST, PUT 요청이면 바디 있는 fetch
//       return await fetch(apiUrl, {
//         method,
//         headers,
//         credentials: "include"
//         body: JSON.stringify(data),
//       });
//     }
//   } catch (err) {
//     console.log("error");
//     console.log(res.status);
//   }
// };
