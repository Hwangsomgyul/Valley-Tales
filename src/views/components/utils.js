// utils.js

// 공통 함수
export function showElement(element) {
    // 요소가 배열일 경우 각각 처리
    if (Array.isArray(element)) {
        element.forEach(el => el.style.display = 'block');
    } else {
        element.style.display = 'block';
    }
}

export function hideElement(element) {
    // 요소가 배열일 경우 각각 처리
    if (Array.isArray(element)) {
        element.forEach(el => el.style.display = 'none');
    } else {
        element.style.display = 'none';
    }
}
