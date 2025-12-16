// frontend/src/admin/AdminDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Adjust these imports if your files are in a different folder
import AdminBookings from "./AdminBookings";
import AdminUsers from "./AdminUsers";
// Optionally keep AdminServices in separate file; otherwise services grid is in this file
import AdminServices from "./AdminServices";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const modernCss = `
:root{
  --bg:#f6f8fb;
  --card:#ffffff;
  --muted:#6b7280;
  --primary:#0d6efd;
  --accent:#06b6d4;
  --danger:#ef4444;
  --radius:12px;
  --shadow: 0 8px 30px rgba(13,16,25,0.06);
}
.admin-dashboard {
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: var(--bg);
  min-height: 100vh;
  color: #111827;
}
.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:20px 28px;
  background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6));
  border-bottom: 1px solid rgba(15,23,42,0.04);
}
.brand { display:flex; align-items:center; gap:12px; }
.brand .logo { width:48px; height:48px; border-radius:10px;
  background: linear-gradient(135deg,#2563eb,#06b6d4);
  color:white; display:flex; align-items:center; justify-content:center; font-weight:700;
  box-shadow: 0 6px 18px rgba(13,16,25,0.08);
}
.top-actions { display:flex; gap:12px; align-items:center; }

.container-grid { display:grid; grid-template-columns: 260px 1fr; gap:28px; padding:28px; }

/* Sidebar */
.sidebar { position:sticky; top:28px; background: var(--card); border-radius: var(--radius); padding:18px; box-shadow: var(--shadow); height:fit-content; }
.stat { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-radius:10px; margin-bottom:10px; background: linear-gradient(180deg, rgba(246,248,250,0.8), rgba(255,255,255,0.6)); }
.stat .label { color:var(--muted); font-size:13px; }
.stat .value { font-weight:700; font-size:18px; }

/* Status pills */
.status-wrap { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
.status-pill {
  display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px; font-weight:700; font-size:13px;
  box-shadow: 0 8px 20px rgba(13,16,25,0.04);
  color:white;
}
.status-pill.pending { background: linear-gradient(90deg,#f59e0b,#f97316); }
.status-pill.confirmed { background: linear-gradient(90deg,#06b6d4,#2563eb); }
.status-pill.canceled { background: linear-gradient(90deg,#ef4444,#dc2626); }
.status-pill.other { background: linear-gradient(90deg,#6b7280,#9ca3af); }

/* Main content */
.content { padding:6px 4px; }
.header-row { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:18px; }

/* tabs */
.admin-tabs { display:flex; gap:12px; margin-bottom:18px; align-items:center; }
.tab {
  padding:10px 14px; border-radius:10px; cursor:pointer; font-weight:700; color:var(--muted);
  background:transparent; border:1px solid transparent;
}
.tab.active { background: linear-gradient(90deg,#2563eb,#06b6d4); color:white; box-shadow: 0 10px 30px rgba(37,99,235,0.12); }

/* Services grid */
.services-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:20px; }
.card { background: var(--card); border-radius:12px; padding:0; overflow:hidden; box-shadow: var(--shadow); display:flex; flex-direction:column; min-height:320px; }
.card .media { height:160px; width:100%; object-fit:cover; background:#eef2f7; display:flex; align-items:center; justify-content:center; }
.card .body { padding:16px; display:flex; flex-direction:column; gap:10px; flex:1; }
.card h5 { margin:0; font-size:16px; }
.card p { margin:0; color:var(--muted); font-size:14px; line-height:1.45; }
.card .footer { margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:12px; padding-top:6px; }

/* Buttons */
.btn { padding:8px 12px; border-radius:10px; border:none; cursor:pointer; font-weight:600; }
.btn-primary { background: linear-gradient(90deg,#2563eb,#06b6d4); color:white; box-shadow: 0 6px 16px rgba(37,99,235,0.12); }
.btn-ghost { background:transparent; border:1px solid rgba(13,16,25,0.06); color:var(--muted); }
.btn-danger { background:var(--danger); color:white; border-radius:10px; }

/* Modal */
.modal-backdrop { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background: rgba(7,9,13,0.45); z-index:3000; }
.modal-card { width:680px; max-width:95%; border-radius:12px; background:var(--card); padding:20px; box-shadow:0 30px 80px rgba(2,6,23,0.5); }
.form-row { display:flex; gap:12px; }
.form-col { flex:1; display:flex; flex-direction:column; gap:8px; }
.form-label { font-size:13px; color:var(--muted); }
.form-control { padding:10px 12px; border-radius:8px; border:1px solid rgba(15,23,42,0.06); background:white; }
.small-muted { color:var(--muted); font-size:13px; margin-top:8px; }

/* responsiveness */
@media (max-width:900px){
  .container-grid { grid-template-columns: 1fr; padding:16px; }
  .sidebar { display:flex; gap:12px; overflow-x:auto; }
  .stat { min-width:180px; flex:0 0 auto; }
}
`;

export default function AdminDashboard() {
  const navigate = useNavigate?.() || (() => {});
  const [stats, setStats] = useState({
    servicesCount: 0,
    bookingsCount: 0,
    usersCount: 0,
    bookingsByStatus: {},
  });
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState("");
  const [servicesError, setServicesError] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // form refs
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const fileRef = useRef();
  const categoryRef = useRef();

  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("services"); // services | bookings | users

  // categories (hard-coded)
  const categories = [
    { value: "women-salon", label: "Women's Salon & Spa" },
    { value: "men-salon", label: "Men's Salon & Grooming" },
    { value: "cleaning", label: "Cleaning" },
    { value: "pest-control", label: "Pest Control" },
    { value: "electrician", label: "Electrician" },
    { value: "plumber", label: "Plumber" },
    { value: "carpenter", label: "Carpenter" },
    { value: "ac-appliance-repair", label: "AC & Appliance Repair" },
    { value: "water-purifier", label: "Water Purifier" },
    { value: "general", label: "General" }
  ];

  useEffect(() => {
    loadStats();
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadStats() {
    setLoadingStats(true);
    try {
      const res = await fetch(`${BACKEND}/api/admin/stats`, { credentials: "include" });
      if (!res.ok) throw new Error(`Stats load failed (${res.status})`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Stats load error:", err);
      setError("Failed to load stats.");
    } finally {
      setLoadingStats(false);
    }
  }

  async function loadServices() {
    setLoadingServices(true);
    setServicesError("");
    try {
      const res = await fetch(`${BACKEND}/api/services`);
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Services load failed (${res.status}) ${txt}`);
      }
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Services load error:", err);
      setServicesError("Failed to load services.");
    } finally {
      setLoadingServices(false);
    }
  }

  function imageUrlFor(image) {
    if (!image) return "";
    if (typeof image === "string") {
      if (image.startsWith("http") || image.startsWith("//")) return image;
      const p = image.startsWith("/") ? image : `/${image}`;
      return `${BACKEND}${p}`;
    }
    if (Array.isArray(image) && image.length > 0) {
      return imageUrlFor(image[0]);
    }
    if (typeof image === "object") {
      const url = image.url || image.path || image.src || image.imageUrl || image.uploadedUrl;
      if (url) return imageUrlFor(url);
      if (image.file && (image.file.url || image.file.path)) return imageUrlFor(image.file.url || image.file.path);
    }
    return "";
  }

  function formatPrice(svc) {
    if (!svc) return "₹0";
    const candidates = [
      svc.price,
      svc.amount,
      svc.pricing,
      svc.cost,
      svc.basePrice,
      svc.price?.value,
      svc.price?.amount,
    ];
    const val = candidates.find((v) => v !== undefined && v !== null && v !== "");
    const num = Number(val);
    if (!Number.isFinite(num)) return "₹0";
    return num % 1 === 0 ? `₹${num}` : `₹${num.toFixed(2)}`;
  }

  async function submitService(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const title = titleRef.current.value.trim();
      const description = descRef.current.value.trim();
      const price = priceRef.current.value.trim();
      const fileInput = fileRef.current.files && fileRef.current.files[0];
      const category = categoryRef.current?.value || "general";

      if (!title || !price) {
        setMessage("Title and price are required.");
        setSaving(false);
        return;
      }

      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("price", price);
      form.append("category", category);
      if (fileInput) form.append("image", fileInput);

      const res = await fetch(`${BACKEND}/api/services`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        console.error("Create service response (non-json):", text);
        throw new Error(`Failed to create service (${res.status})`);
      }

      if (!res.ok) {
        const message = json?.message || `Failed to create service (${res.status})`;
        throw new Error(message);
      }

      setMessage("Service created");
      setAddOpen(false);
      titleRef.current.value = "";
      descRef.current.value = "";
      priceRef.current.value = "";
      if (fileRef.current) fileRef.current.value = null;
      if (categoryRef.current) categoryRef.current.value = categories[0].value;

      await loadServices();
    } catch (err) {
      console.error("Create service error:", err);
      setMessage(`Failed to create service: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  function openAddModal() {
    setMessage("");
    setAddOpen(true);
  }
  function closeAddModal() {
    setAddOpen(false);
  }
  function logout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (e) {}
    navigate("/");
  }
  async function viewService(id) {
    navigate(`/services/${id}`);
  }

  const filtered = services.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (s.title || "").toLowerCase().includes(q) || (s.description || "").toLowerCase().includes(q);
  });

  function statusClass(status) {
    if (!status) return "status-pill other";
    const s = String(status).toLowerCase();
    if (s.includes("pending")) return "status-pill pending";
    if (s.includes("confirm") || s.includes("booked") || s.includes("accepted")) return "status-pill confirmed";
    if (s.includes("cancel") || s.includes("rejected")) return "status-pill canceled";
    return "status-pill other";
  }

  return (
    <div className="admin-dashboard">
      <style>{modernCss}</style>

      <div className="topbar">
        <div className="brand">
          <div className="logo">HL</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>HYPERLOCAL</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Home services • Admin</div>
          </div>
        </div>

        <div className="top-actions">
          <div style={{ minWidth: 300 }} className="search">
            <input
              placeholder="Search services or descriptions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: "100%", padding: 10, borderRadius: 999, border: "1px solid rgba(15,23,42,0.06)" }}
            />
          </div>

          <button className="btn btn-ghost" onClick={openAddModal}>+ Add service</button>
          <button className="btn btn-primary" onClick={loadServices}>Refresh</button>
          <button className="btn" style={{ border: "1px solid rgba(15,23,42,0.06)", borderRadius: 999 }} onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="container-grid">
        <aside className="sidebar" aria-label="Admin stats">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>Overview</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{loadingStats ? "..." : new Date().toLocaleDateString()}</div>
          </div>

          <div className="stat">
            <div><div className="label">Services</div></div>
            <div className="value">{loadingStats ? "..." : stats.servicesCount}</div>
          </div>

          <div className="stat">
            <div><div className="label">Bookings</div></div>
            <div className="value">{loadingStats ? "..." : stats.bookingsCount}</div>
          </div>

          <div className="stat">
            <div><div className="label">Users</div></div>
            <div className="value">{loadingStats ? "..." : stats.usersCount}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Quick actions</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" onClick={openAddModal}>Create</button>
              <button className="btn btn-ghost" onClick={() => { navigator.clipboard?.writeText(window.location.href); setMessage("Dashboard URL copied"); }}>Share</button>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Bookings by status</div>
            <div className="status-wrap">
              {loadingStats ? (
                <div style={{ color: "var(--muted)" }}>Loading...</div>
              ) : Object.keys(stats.bookingsByStatus || {}).length === 0 ? (
                <div style={{ color: "var(--muted)" }}>No bookings</div>
              ) : (
                Object.entries(stats.bookingsByStatus || {}).map(([k, v]) => (
                  <div key={k} className={statusClass(k)} title={`${k}: ${v}`}>
                    {k} <span style={{ opacity: 0.9, marginLeft: 6, background: "rgba(255,255,255,0.18)", padding: "2px 8px", borderRadius: 999 }}>{v}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        <main className="content">
          {message && <div style={{ marginBottom: 12, color: "#0f172a", background: "#e6f2ff", padding: 10, borderRadius: 8 }}>{message}</div>}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <h2 style={{ margin: 0 }}>Admin</h2>
              <div style={{ color: "var(--muted)", marginTop: 4 }}>{loadingServices ? "Loading..." : `${filtered.length} services`}</div>
            </div>

            {/* tabs */}
            <div className="admin-tabs">
              <div className={`tab ${activeTab === "services" ? "active" : ""}`} onClick={() => setActiveTab("services")}>Services</div>
              <div className={`tab ${activeTab === "bookings" ? "active" : ""}`} onClick={() => setActiveTab("bookings")}>Bookings</div>
              <div className={`tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Users</div>
            </div>
          </div>

          {/* Render based on selected tab */}
          {activeTab === "services" && (
            <>
              <div className="services-grid" role="list">
                {loadingServices ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div className="card" key={i}>
                      <div className="media" style={{ background: "#f3f6fb" }}>
                        <div style={{ width: 80, height: 12, background: "#e6eefc", borderRadius: 6 }} />
                      </div>
                      <div className="body">
                        <div style={{ width: "70%", height: 16, background: "#eef2fb", borderRadius: 6 }} />
                        <div style={{ width: "100%", height: 12, background: "#f5f7fa", borderRadius: 6, marginTop: 6 }} />
                        <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
                          <div style={{ flex: 1, height: 36, background: "#f5f7fa", borderRadius: 8 }} />
                          <div style={{ width: 80, height: 36, background: "#f5f7fa", borderRadius: 8 }} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : filtered.length === 0 ? (
                  <div style={{ gridColumn: "1/-1", padding: 20, background: "white", borderRadius: 12, boxShadow: "var(--shadow)" }}>
                    <div style={{ fontWeight: 700 }}>No services found</div>
                    <div style={{ color: "var(--muted)" }}>Try adding a new service or clearing the search.</div>
                  </div>
                ) : (
                  filtered.map((svc) => {
                    const img = imageUrlFor(svc.image || svc.imageUrl || svc.images || svc.photo);
                    const priceText = formatPrice(svc);
                    return (
                      <div className="card" key={svc._id || svc.id} role="listitem">
                        {img ? (
                          <img
                            className="media"
                            src={img}
                            alt={svc.title}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'800'%20height%3D'400'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'%23eef2f7'/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20font-family%3D'Arial'%20font-size%3D'24'%20fill%3D'%239ca3af'%3ENo%20image%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        ) : (
                          <div className="media">
                            <div style={{ textAlign: "center", color: "var(--muted)" }}>No image</div>
                          </div>
                        )}

                        <div className="body">
                          <h5>{svc.title || "Untitled"}</h5>
                          <p>{svc.description || "—"}</p>

                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ fontWeight: 800 }}>{priceText}</div>
                            <div style={{ color: "var(--muted)", fontSize: 13 }}>{svc.category || ""}</div>
                          </div>

                          <div className="footer">
                            <div style={{ display: "flex", gap: 8 }}>
                              <button className="btn btn-ghost" onClick={() => viewService(svc._id)}>View</button>
                              <button className="btn btn-primary" onClick={() => { navigator.clipboard?.writeText(svc._id || svc.id); setMessage("Service id copied"); }}>Copy ID</button>
                            </div>

                            <div style={{ display: "flex", gap: 8 }}>
                              <button className="btn btn-primary" onClick={() => viewService(svc._id)}>Open</button>
                              <button className="btn btn-danger" onClick={async () => {
                                if (!confirm("Delete this service?")) return;
                                try {
                                  const r = await fetch(`${BACKEND}/api/services/${svc._id}`, { method: "DELETE", credentials: "include" });
                                  if (!r.ok) {
                                    const txt = await r.text();
                                    throw new Error(`Delete failed: ${r.status} ${txt}`);
                                  }
                                  setMessage("Service deleted");
                                  loadServices();
                                } catch (err) {
                                  console.error("Delete error:", err);
                                  setMessage("Delete failed");
                                }
                              }}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div style={{ padding: 8 }}>
              {/* AdminBookings component handles its own layout */}
              <AdminBookings />
            </div>
          )}

          {activeTab === "users" && (
            <div style={{ padding: 8 }}>
              <AdminUsers />
            </div>
          )}

          <section style={{ marginTop: 28 }}>
            <h3 style={{ marginBottom: 12 }}>Bookings by status</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {Object.entries(stats.bookingsByStatus || {}).length === 0 ? (
                <div style={{ color: "var(--muted)" }}>No booking statuses</div>
              ) : (
                Object.entries(stats.bookingsByStatus || {}).map(([k, v]) => (
                  <div key={k} className={statusClass(k)} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <strong style={{ textTransform: "capitalize" }}>{k}</strong>
                    <span style={{ background: "rgba(255,255,255,0.18)", padding: "4px 8px", borderRadius: 999 }}>{v}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Add Service Modal */}
      {addOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h4 style={{ margin: 0 }}>Add Service</h4>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{saving ? "Saving..." : ""}</div>
            </div>

            <form onSubmit={submitService}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 12 }}>
                <div className="form-col">
                  <label className="form-label">Title</label>
                  <input ref={titleRef} className="form-control" placeholder="Service title" />
                </div>

                <div className="form-col">
                  <label className="form-label">Price</label>
                  <input ref={priceRef} className="form-control" placeholder="Price (e.g. 499)" />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label className="form-label">Description</label>
                <textarea ref={descRef} className="form-control" placeholder="Describe the service" rows={4} />
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Category</label>
                  <select ref={categoryRef} defaultValue={categories[0].value} className="form-control">
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Choose the category this service belongs to.</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Image (optional)</label>
                  <input ref={fileRef} type="file" accept="image/*" className="form-control" />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="button" className="btn btn-ghost" onClick={closeAddModal} disabled={saving}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                </div>
              </div>

              {message && <div style={{ marginTop: 12, color: "#0f172a", background: "#e6f8ff", padding: 10, borderRadius: 8 }}>{message}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
