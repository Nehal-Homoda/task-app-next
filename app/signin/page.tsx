"use client";
import { FormEventHandler, useState } from "react";
import { login } from "../API";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      var result = await login(userName, password);
      if (result?.access_token) router.push("/");
      else alert("Invalid login.");
    } catch {
      alert("Invalid login.");
    }
  };

  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmitLogin} className="form">
        <input
          type="text"
          placeholder="Nehal1234"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input input-bordered input-secondary w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <input
          type="submit"
          placeholder="Type here"
          className="input input-bordered input-warning w-full max-w-xs"
        />
        <a href="/signup">Dont have an account</a>
      </form>
    </div>
  );
};

export default Signin;
