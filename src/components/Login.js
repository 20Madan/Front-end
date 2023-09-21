import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }

  },[])
  const handelLogin= async()=>{
    let result = await fetch("http://localhost:5002/login",{
        method:"post",
        body: JSON.stringify({email,password}),
        headers: {
            'Content-Type': 'application/json',
          }
    })
    result=await result.json();
    if(result.auth){
        localStorage.setItem('token', JSON.stringify(result.auth));
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/')
    }
    else{
        alert('Please Enter correct details')
    }
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        className="input-box"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button className="appButton" type="button" onClick={handelLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
