import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Appbar } from './Appbar';

export function AppSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const onMenuClick = () => {
  onClose(); // or toggle logic if needed
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/signin');
    window.location.reload();
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
        

          <div className="shadow h-14 flex justify-between">
      <div className="flex flex-row items-center h-full ml-4">
        <div className="flex flex-col justify-center" onClick={onMenuClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <div className="ml-2 flex flex-col justify-center">PayTM App</div>
      </div>

        </div>
          <hr></hr>
          <Menu iconShape="circle">
            <MenuItem onClick={() => { navigate("/dashboard"); onClose(); }}>Dashboard</MenuItem>
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
