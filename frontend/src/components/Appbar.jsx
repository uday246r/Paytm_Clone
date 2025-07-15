import { useState,useEffect } from "react";
import axios from "axios";

export const Appbar = () =>{
    const [user,setUser]  = useState({});
    useEffect(()=>{
        const fetchUser = async() => {
        try{
       const res =  await axios.get("http://localhost:3000/api/v1/user/me",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
        setUser(res.data);
        console.log(res.data);
}catch (error) {
    console.error("Error fetching user:", error);
  }
};
    fetchUser();
       },[]);
    return(
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {user?.firstName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                            {user?.firstName[0]}
                            
                    </div>
                </div>
            </div>
        </div>
    )
}