// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Service from './pages/Service'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import { getToken } from './api/authHelpers'
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminServices from './components/admin/AdminServices';
import AdminBookings from './components/admin/AdminBookings';
import AdminUsers from './components/admin/AdminUsers';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import CategoriesPage from './pages/categories/CategoriesPage'
import WomensSalon from './pages/categories/WomensSalon'
import MensSalon from './pages/categories/MensSalon'
import CleaningPestControl from './pages/categories/CleaningPestControl'
import ElectricianPlumber from './pages/categories/ElectricianPlumber'
import ACRepair from './pages/categories/ACRepair'
import WaterPurifier from './pages/categories/WaterPurifier'
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Investors from "./pages/Investors";

import Cart from "./pages/Cart";
import Review from "./pages/Review";

import RegisterProfessional from "./pages/RegisterProfessional";
import PartnerResources from "./pages/PartnerResources";
import PricingPayouts from "./pages/PricingPayouts";


function App(){
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<Service />} />
          <Route path="/booking/:id" element={
            <RequireAuth>
              <Booking />
            </RequireAuth>
          } />

       
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

       <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/pro/register" element={<RegisterProfessional />} />
<Route path="/pro/resources" element={<PartnerResources />} />
<Route path="/pro/pricing" element={<PricingPayouts />} />
         
             <Route path="/Review" element={<Review />} />
           
        
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/womens-salon" element={<WomensSalon />} />
          <Route path="/categories/mens-salon" element={<MensSalon />} />
          <Route path="/categories/cleaning-pest-control" element={<CleaningPestControl />} />
          <Route path="/categories/electrician-plumber" element={<ElectricianPlumber />} />
          <Route path="/categories/ac-appliance-repair" element={<ACRepair />} />
          <Route path="/categories/water-purifier" element={<WaterPurifier />} />

      
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/services" element={
            <ProtectedAdminRoute><AdminServices/></ProtectedAdminRoute>
          } />
          <Route path="/admin/bookings" element={<ProtectedAdminRoute><AdminBookings/></ProtectedAdminRoute>} />
          <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsers/></ProtectedAdminRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  )
}

function RequireAuth({ children }) {
  const token = getToken()
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default App
