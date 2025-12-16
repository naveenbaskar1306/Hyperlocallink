// frontend/src/admin/AdminServices.jsx
import React, { useEffect, useState } from 'react';
import { listAdminServices, createService, updateServiceAPI, deleteServiceAPI } from '../../api/adminApi';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  async function load() {
    setLoading(true);
    const data = await listAdminServices();
    setServices(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addService(e) {
    e.preventDefault();
    const created = await createService({ title, category: 'General', basePrice: 100, durationMins: 60, description: '' });
    setTitle('');
    await load();
  }

  async function remove(id) {
    await deleteServiceAPI(id);
    await load();
  }

  if (loading) return <div className="container">Loading services...</div>;
  return (
    <div className="container" style={{ padding: 24 }}>
      <h1>Services</h1>
      <form onSubmit={addService} style={{ marginBottom: 16 }}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New service title" />
        <button type="submit">Create</button>
      </form>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:16 }}>
        {services.map(s => (
          <div key={s._id} style={{ background:'#fff', padding:16, borderRadius:8 }}>
            <h3>{s.title}</h3>
            <div>Price: ₹{s.basePrice}</div>
            <div>Duration: {s.durationMins} mins</div>
            <div style={{ marginTop:8 }}>
              <button onClick={() => remove(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
