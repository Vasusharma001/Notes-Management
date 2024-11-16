import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  let navigate = useNavigate();
  const host = process.env.REACT_APP_host;
  const [credentials, setCredentials] = useState({email : "",password : ""})
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e) => {
    //In order to prevent unwanted page reload    
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`,{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email : credentials.email,password : credentials.password})
    }
    );
    const json = await response.json();
    console.log(json);
    if(json.success){
      // save the auth token and redirect
      //We are saving auth in order to use it as a unique identifier for each user
      localStorage.setItem('token',json.authToken); 
      navigate('/');
      props.showAlert("Logged in Successfully","success")
    }else{
      props.showAlert("Invalid Credentials","danger")
    }
  }
  return (
    <div className={`container my-4`} >
      <h2 className={`text-${props.mode==='light'? 'dark' : 'light'} my-4`} >Task Nation - Login to start dealing with personalised Tasks</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className={`form-label text-${props.mode==='light'? 'dark' : 'light'} `}>Email address</label>
          <input type="email" onChange={onChange} value={credentials.email} className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className={`form-label text-${props.mode==='light'? 'dark' : 'light'} `}>Password</label>
          <input type="password" onChange={onChange} value={credentials.password} name="password" className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`} id="password" />
        </div>
        <button type="submit" className={`btn btn-${props.mode==='dark'? 'outline-light' : 'primary'}`}>Login</button>
      </form>
    </div>
  )
}

export default Login