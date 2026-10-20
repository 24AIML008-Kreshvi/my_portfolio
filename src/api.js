const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
let accessToken = sessionStorage.getItem('awdf_token') || '';
let unauthorizedHandler = () => {};
export const setUnauthorizedHandler = callback => { unauthorizedHandler = callback; };
export const getToken = () => accessToken;
export function setToken(token) {
  accessToken = token || '';
  if (accessToken) sessionStorage.setItem('awdf_token', accessToken);
  else sessionStorage.removeItem('awdf_token');
}
async function request(path, options = {}, authenticated = false) {
  let response;
  try {
    response = await fetch(BASE_URL + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(authenticated && accessToken ? { Authorization: 'Bearer ' + accessToken } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Network error. Is Express running on port 5000?');
  }
  let data;
  try { data = await response.json(); } catch { throw new Error('Unexpected server response'); }
  if (!response.ok) {
    if (response.status === 401 && authenticated) {
      setToken('');
      unauthorizedHandler();
    }
    const message = data.message || data.error || 'Request failed';
    throw new Error(message);
  }
  return data;
}
export const register = details => request('/register', { method: 'POST', body: JSON.stringify(details) });
export const login = details => request('/login', { method: 'POST', body: JSON.stringify(details) });
export const me = () => request('/me', {}, true);
export const getTasks = () => request('/tasks', {}, true);
export const createTask = task => request('/tasks', { method: 'POST', body: JSON.stringify(task) }, true);
export const updateTask = (id, patch) => request('/tasks/' + id, { method: 'PUT', body: JSON.stringify(patch) }, true);
export const deleteTask = id => request('/tasks/' + id, { method: 'DELETE' }, true);
