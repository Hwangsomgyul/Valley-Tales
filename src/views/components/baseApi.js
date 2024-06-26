const API_PREFIX_URL = "/api";
const defaultHeaders = { "Content-Type": "application/json" };
const nonBodyMethods = ["get", "delete"];
const DEFAULT_TIMEOUT = 5000;
const abortController = new AbortController();
const signal = abortController.signal;

const baseApi = ({ path = "", method = "get", data = {} }) => {
  try {
    setTimeout(() => {
      abortController.abort();
    }, DEFAULT_TIMEOUT);

    const apiUrl = `${API_PREFIX_URL}/${path}`;
    if (nonBodyMethods.includes(method.toLowerCase())) {
      // body가 필요없는 GET, DELETE;
      return fetch(apiUrl, { method, headers: { ...defaultHeaders }, signal });
    }
    // POST, PUT, PATCH
    let body = data;
    let headers = defaultHeaders;
    if (data instanceof FormData) {
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      body = JSON.stringify(data);
    }
    return fetch(apiUrl, { method, body, headers, signal });
  } catch (err) {
    throw new Error("API Call Error");
  }
};

export {
  API_PREFIX_URL,
  defaultHeaders,
  nonBodyMethods,
  DEFAULT_TIMEOUT,
  abortController,
  signal,
  baseApi,
};
