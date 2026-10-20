const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(BASE_URL + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    throw new Error('Network error. Is the Express backend running on port 5000?');
  }
  let data;
  try { data = await response.json(); } catch { throw new Error('Unexpected response from the backend'); }
  if (!response.ok) {
    const extra = data.details ? ': ' + Object.values(data.details).join(', ') : '';
    throw new Error((data.error || 'Request failed') + extra);
  }
  return data;
}
export const getTasks = () => request('/tasks');
export const createTask = task => request('/tasks', { method: 'POST', body: JSON.stringify(task) });
export const updateTask = (id, patch) => request('/tasks/' + id, { method: 'PUT', body: JSON.stringify(patch) });
export const deleteTask = id => request('/tasks/' + id, { method: 'DELETE' });
