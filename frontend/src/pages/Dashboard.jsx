import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () =>{
    const [currentBalance,setCurrentBalance] = useState("");
useEffect(()=>{
async function fetchBalance(){
    try{
    const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    setCurrentBalance(res.data.balance);
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