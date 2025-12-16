// frontend/src/api/adminApi.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function getStats() {
  const res = await fetch(`${API_BASE}/admin/stats`, { headers: authHeaders() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listAdminServices() {
  const res = await fetch(`${API_BASE}/admin/services`, { headers: authHeaders() });
  return res.json();
}

// other helpers
export async function createService(body) {
  const res = await fetch(`${API_BASE}/admin/services`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
  return res.json();
}

export async function updateServiceAPI(id, body) {
  const res = await fetch(`${API_BASE}/admin/services/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
  return res.json();
}

export async function deleteServiceAPI(id) {
  const res = await fetch(`${API_BASE}/admin/services/${id}`, { method: 'DELETE', headers: authHeaders() });
  return res.json();
}

export async function listBookingsAdmin() {
  const res = await fetch(`${API_BASE}/admin/bookings`, { headers: authHeaders() });
  return res.json();
}

export async function updateBookingStatusAPI(id, status) {
  const res = await fetch(`${API_BASE}/admin/bookings/${id}/status`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }) });
  return res.json();
}

export async function listUsersAdmin() {
  const res = await fetch(`${API_BASE}/admin/users`, { headers: authHeaders() });
  return res.json();
}

export async function updateUserRoleAPI(id, body) {
  const res = await fetch(`${API_BASE}/admin/users/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(body) });
  return res.json();
}
