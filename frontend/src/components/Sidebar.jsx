import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

export function AppSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/signin');
    onClose();
  };

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar collapsed={false} className="h-full bg-white">
          <Menu iconShape="circle">
            <MenuItem onClick={() => { navigate("/dashboard"); onClose(); }}>Dashboard</MenuItem>
            <MenuItem onClick={() => { navigate("/send"); onClose(); }}>Send Money</MenuItem>
            <MenuItem onClick={() => { navigate("/signup"); onClose(); }}>Sign Up</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* Overlay behind sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30"
          onClick={onClose}
        />
      )}
    </>
  );
}
