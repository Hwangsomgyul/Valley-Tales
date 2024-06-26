async function fetchGetInfo(url) {
  // API 호출
  const response = await fetch(`/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export { fetchGetInfo };
