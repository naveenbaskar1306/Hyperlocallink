// frontend/src/admin/AdminUsers.jsx
import React, { useEffect, useState } from 'react';
import { listUsersAdmin, updateUserRoleAPI } from '../../api/adminApi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{ listUsersAdmin().then(setUsers); }, []);

  async function toggleAdmin(u) {
    await updateUserRoleAPI(u._id, { role: u.role === 'admin' ? 'user' : 'admin' });
    setUsers(users.map(x => x._id === u._id ? { ...x, role: x.role === 'admin' ? 'user' : 'admin' } : x));
  }

  return (
    <div className="container" style={{ padding: 24 }}>
      <h1>Users</h1>
      <table style={{ width:'100%', background:'#fff' }}>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id}>
              <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
              <td><button onClick={()=>toggleAdmin(u)}>{u.role==='admin' ? 'Revoke admin' : 'Make admin'}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
