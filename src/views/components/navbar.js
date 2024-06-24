document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");

  // nav bar 요소를 생성
  navbarContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Valley-Tales</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">마이 페이지</a></li>
        <li class="nav-item"><a class="nav-link" href="#">네트워크</a></li>
        <li class="nav-item"><a class="nav-link" href="#">로그아웃</a></li>
      </ul>
    </div>
  </nav>
  <h2 class="text-center mb-4">
  엘리스 밸리에서 전해지는 신비한 개발 이야기, 이곳에서 주민들을 만나 보세요.
  </h2>
    `;
  // navbarContainer.appendChild(navbar);
});

// Load Navbar Component
// 경로 업데이트
// fetch("navbar.html")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok: " + response.statusText);
//     }
//     return response.text();
//   })
//   .then((data) => {
//     document.getElementById("navbar").innerText = data;
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error);
//   });
