document.addEventListener('DOMContentLoaded', function () {
    const userCardsContainer = document.getElementById('userCards');

    // 사용자 데이터 가상 정의
    const users = [
        {
            username: '황솜귤',
            email: 'hwangsomgyul@naver.com',
            description: '가나다라마바사',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            username: '김민지',
            email: 'minji@elicer.com',
            description: '안녕하세요',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            username: '엘리스',
            email: 'elice@elicer.com',
            description: '상세 설명을 작성해 주세요.',
            imageUrl: 'https://via.placeholder.com/150'
        },
        // 임의의 사용자 데이터
    ];

    // 카드 요소를 생성
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
            <div class="card">
                <img src="${user.imageUrl}" class="card-img-top" alt="${user.username}">
                <div class="card-body">
                    <h5 class="card-title">${user.username}</h5>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text">${user.description}</p>
                    <a href="#" class="btn btn-primary">Show User</a>
                </div>
            </div>
        `;

        userCardsContainer.appendChild(card);
    });
});

// Load Navbar Component
fetch('components/navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('navbar').innerText = data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

const getUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      method: 'GET',
      credentials: 'include' // 세션 쿠키 포함
    });
    const result = await response.json();
    if (result.error) {
      alert(result.error);
    } else {
      console.log(result.data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

