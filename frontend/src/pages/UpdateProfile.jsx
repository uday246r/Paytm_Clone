import { useState } from 'react';
import axios from 'axios';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { Heading } from '../components/Headings';
import { SubHeading } from '../components/SubHeading';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    const [balance, setBalance] = useState("");
      const [showToast,setShowToast] = useState(false);
    const [errorToast,setErrorToast] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("http://localhost:3000/api/v1/user/update", {
                // firstName,
                // lastName,
                balance
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
             setShowToast(true);
                                setTimeout(()=>{
                                    navigate("/dashboard");
                                },2000)
        } catch (error) {
            setErrorToast(true);
                                setTimeout(()=>{
                                    navigate("/dashboard");
                                },2000)
        }
    };

    return (
        <div className='bg-slate-300 h-screen flex justify-center'>
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Boost Your Balance"} />
                    <SubHeading label={"Enable secure transactions"} />

                    {/* <InputBox 
                        label={"First Name"} 
                        placeholder={"Enter your first name"} 
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <InputBox 
                        label={"Last Name"} 
                        placeholder={"Enter your last name"}
                        onChange={e => setLastName(e.target.value)}
                    /> */}
                    <InputBox 
                        label={"Balance"}
                        placeholder="Add amount to your account"
                        onChange={e => setBalance(e.target.value)}
                    />
                    
                    <div>
                        <Button label={"Add Balance"} onClick={handleSubmit} />
                    </div>
                </div>

                {errorToast &&<div className="toast toast-center toast-middle">

                                 <div className="alert alert-error">
                                   <span>Update Failed</span>
                                 </div>
                               </div>}

{showToast &&<div className="toast toast-center toast-middle">

                                 <div className="alert alert-success">
                                   <span>Update Successfull.</span>
                                 </div>
                               </div>}

            </div>
        </div>
    );
}
