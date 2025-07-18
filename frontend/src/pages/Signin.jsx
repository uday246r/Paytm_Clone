import { useState } from 'react';
import { Heading }  from "../components/Headings"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export const Signin = () =>{
    const [ username, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [showToast,setShowToast] = useState(false);
    const [errorToast,setErrorToast] = useState(false);

    const navigate = useNavigate();

    const handleSignin = async() =>{
         try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                    username,
                                    password
                                });
                                localStorage.setItem("token",response.data.token);
                                setShowToast(true);
setTimeout(() => {
  setShowToast(false);
  navigate("/dashboard");
  window.location.reload();
}, 1000);

                            } catch (e) {
                                setErrorToast(true)
                                setTimeout(() => {
        setErrorToast(false);
    }, 2000);
                            }
                        }
    
    return(
        <>

        { errorToast &&  (
                                 <div className="toast toast-center toast-middle">

                                 <div className="alert alert-error">
                                   <span>Invalid Credentials</span>
                                 </div>
                               </div>

    )}

        { showToast &&  (
                                 <div className="toast toast-center toast-middle">

                                 <div className="alert alert-success">
                                   <span>Signin Successfully</span>
                                 </div>
                               </div>

    )}
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                        <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your details to Sign in"}/>
                    <InputBox onChange={e=>{
                        setUserName(e.target.value)
                    }} placeholder= {"uday@gmail.com"} label={"Email"}
                    />
                    <InputBox onChange={e=>{
                        setPassword(e.target.value)
                    }} placeholder={"Uday@123"} label={"Password"}
                     />

                    <div>
                        <Button onClick={handleSignin} label={"Sign in"}
                        />
                    </div>
                    <div>
                        <BottomWarning label={"Don't have an Account?"} buttonText={"Sign up"} to={"/signup"}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}