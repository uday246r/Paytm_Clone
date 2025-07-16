import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Appbar = ({ onMenuClick }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
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

      {user?.firstName && (
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello, {user?.firstName}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user?.firstName ? user.firstName[0] : ""}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
