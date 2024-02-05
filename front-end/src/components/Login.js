import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpasswoed] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    //console.warn(email, password);
    let result = await fetch("http://localhost:9500/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
      //result.auth
      localStorage.setItem("user", JSON.stringify(result.email)); //result.user
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("please enter connect details");
    }
  };

  return (
    <div className="Register">
      <h1>Login</h1>
      <input
        type="text"
        className="inputBox"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="enter your email"
      />
      <input
        type="text"
        className="inputBox"
        value={password}
        onChange={(e) => setpasswoed(e.target.value)}
        placeholder="password"
      />
      <button className="signup-button" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
