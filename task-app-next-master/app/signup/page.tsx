"use client";
import { FormEventHandler, useState } from "react";
import { login, register } from "../API";
import { useRouter } from "next/navigation";

const signin = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const result = await register(userName, name, mail, password);
      if (result) router.push("/signin");
      else alert("Invalid Data");
    } catch {
      alert("Invalid Data.");
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
          type="text"
          placeholder="Nehal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered input-success w-full max-w-xs"
        />
        <input
          type="email"
          placeholder="Nehal@thebest.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs"
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
        <a href="/signin">Already have an account</a>
      </form>
    </div>
  );
};

export default signin;
