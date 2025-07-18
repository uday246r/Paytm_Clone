import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { useState } from 'react';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import ProtectedRoute from './components/ProtectedRoute';
import { Appbar } from './components/Appbar';
import { AppSidebar } from './components/Sidebar';
import UpdateProfile from './pages/UpdateProfile';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <Appbar onMenuClick={() => setSidebarOpen(true)} />
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/send" element={
          <ProtectedRoute>
            <SendMoney />
          </ProtectedRoute>
        } />
        <Route path="/update" element={
          <ProtectedRoute>
            <UpdateProfile/>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
