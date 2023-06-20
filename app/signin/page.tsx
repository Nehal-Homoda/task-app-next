"use client";
import { FormEventHandler, useState } from "react";
import { login } from "../API";
import { useRouter } from "next/navigation";

const signin = () => {
    const router=useRouter();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmitLogin: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await login(userName,password);
        router.push("/")

    }



    return (<div className="sign-in-form">

        <form onSubmit={handleSubmitLogin} className="login">
            <input type="text" placeholder="" value={userName} onChange={e => setUserName(e.target.value)} className="input input-bordered input-secondary w-full max-w-xs" />
            <input type="password" placeholder="******" value={password} onChange={e => setPassword(e.target.value)} className="input input-bordered input-accent w-full max-w-xs" />
            <input type="submit" placeholder="Type here" className="input input-bordered input-warning w-full max-w-xs" />
        </form>



    </div>)
}


export default signin;