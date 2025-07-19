import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

const API_BASE = process.env.REACT_APP_API_BASE;

export const Dashboard = () =>{
    const [currentBalance,setCurrentBalance] = useState("");
useEffect(()=>{
async function fetchBalance(){
    try{
    const res = await axios.get(`${API_BASE}/api/v1/account/balance`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    setCurrentBalance(res.data.balance.toFixed(2));
    }catch(err){
        console.error("Error fetching balance: ",err);
    }
}
    fetchBalance()

},[])

    return(
        <>
        <div>
            <Balance value={currentBalance}/>
            <Users />
        </div>
        </>
    )
}