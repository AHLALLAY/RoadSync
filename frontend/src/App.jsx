import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ProtectedRoute from './layout/ProtectedRoute';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Trucks from './pages/admin/Trucks';
import Trailers from './pages/admin/Trailers';
import Trips from './pages/admin/Trips';
import DriverLayout from './layout/DriverLayout';
import DriverDashboard from './pages/driver/Dashboard';
import MyTrips from './pages/driver/MyTrips';
import TripDetail from './pages/driver/TripDetail';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="fleet" element={<Navigate to="/admin/fleet/trucks" replace />} />
              <Route path="fleet/trucks" element={<Trucks />} />
              <Route path="fleet/trailers" element={<Trailers />} />
              <Route path="trips" element={<Trips />} />
            </Route>
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['Chauffeur']} />}>
            <Route path="/driver" element={<DriverLayout />}>
              <Route index element={<Navigate to="/driver/dashboard" replace />} />
              <Route path="dashboard" element={<DriverDashboard />} />
              <Route path="trips" element={<MyTrips />} />
              <Route path="trip/:id" element={<TripDetail />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;