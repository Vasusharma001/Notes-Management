import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = (props) => {
  let navigate = useNavigate();
  const host = process.env.REACT_APP_host;
  const [credentials, setCredentials] = useState({name : "",email : "",password : "",cpassword : ""});
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit= async(e) => {
    //In order to prevent unwanted page reload    
    e.preventDefault();
    //very important
    try {
        const {name,email,password} = credentials;
        const response = await fetch(`${host}/api/auth/createuser`,{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({name,email,password})
        }
        );
        const json = await response.json();
        console.log(json);
        // save the auth token and redirect
        if(json.success){
          localStorage.setItem('token',json.authtoken); 
          navigate('/login');
        }else{
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
  }

  
  return (
    <div className={`container my-4 `} >
      <h2 className={`text-${props.mode==='light'? 'dark' : 'light'} my-4`} >Welcome to Task Nation: Signup to Create Your New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className={`form-label text-${props.mode==='light'? 'dark' : 'light'} `}>Name</label>
          <input type="text" onChange={onChange} className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}  value={credentials.name} id="name" name="name"   aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className={`form-label text-${props.mode==='light'? 'dark' : 'light'} `}>Email address</label>
          <input type="email" onChange={onChange} className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}  value={credentials.email} id="email" name="email"  aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className={`form-label text-${props.mode==='light'? 'dark' : 'light'} `}>Password</label>
          <input type="password" onChange={onChange} className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}   value={credentials.password} minLength={5} id="password" name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className={`form-label text-${props.mode==='light'? 'dark' : 'light'} `}>Confirm Password</label>
          <input type="password" onChange={onChange} className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}  value={credentials.cpassword} minLength={5} id="cpassword" name="cpassword"  />
        </div>
        <button type="submit" disabled={credentials.password!==credentials.cpassword} className={`btn btn-${props.mode==='dark'? 'outline-light' : 'primary'}`}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp