import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }

  },[])

  const collectData = async() => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5002/register", {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result=await result.json();
    console.warn(result);
    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));
    navigate('/')
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="input-box"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="input-box"
        type="text"
        value={email}
        placeholder="Enter E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
