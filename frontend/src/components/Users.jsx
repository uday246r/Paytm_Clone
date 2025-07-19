import { useEffect, useState} from 'react'
import { Button } from '../components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { InputBox } from './InputBox'
import Loading from './Loading'

const API_BASE = process.env.REACT_APP_API_BASE;


export const Users = ()=>{
    const [users, setUsers] = useState([]);
    const [currentUser,setCurrentUser] = useState({});
    const [filter, setFilter] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
        const debounceTimer = setTimeout(()=>{
            setFilter(searchText);
        },500);

        return()=>clearTimeout(debounceTimer);
    },[searchText]);

    useEffect(()=>{
        axios.get(`${API_BASE}/api/v1/user/bulk?filter=${filter}`)
        .then(response=>{
            setUsers(response.data.user)
        })
    }, [filter])

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setCurrentUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

    const filteredUsers = users.filter((users=>users.username!=currentUser.username))

    return (
        <div className="m-2">
            <div className="font-bold mt-6 text-lg">
                 Friends
            </div>
            <div className="my-2">
                <InputBox onChange={(e)=>{
                    setSearchText(e.target.value)
                }}
                placeholder="Search users..."
                />
            </div>
            <div>
                {
                  currentUser.username 
                  ? filteredUsers.map(user => (
                        <User user={user}/>
                    ))
                    : <Loading/>
                }
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between">
            <div className="flex" key={user._id}>
                <div className="rounded-full h-12 w-12 bg-slate-200 justify-center mt-1 mr-2">
                    <div className="flex flex-col ml-4 justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button onClick={(e)=>{
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }} label={"Send Money"}
                />
            </div>
        </div>
    )
}