import React from 'react'
import {Link, useLocation,useNavigate} from "react-router-dom";
const NavBar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <Link  className="navbar-brand" to="/">Task Nation</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link  className={`nav-link ${location.pathname==="/"? "active" :""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link  className={`nav-link ${location.pathname==="/about"? "active" :""}`} to="/about">About</Link>
              </li>
            </ul>
            {localStorage.getItem('token')?<button onClick={handleLogOut} className={`btn btn-${props.mode==='dark'? 'outline-light' : 'primary'} mx-2`}>Logout</button> : <form className="d-flex" role="search">
               <Link className={`btn btn-${props.mode==='dark'? 'outline-light' : 'primary'} mx-2`} to="/login" role="button">Login</Link>
               <Link className={`btn btn-${props.mode==='dark'? 'outline-light' : 'primary'} mx-2`} to="/signup" role="button">Sign Up</Link>
            </form>}
            <div className="form-check form-switch">
              <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className={`form-check-label text-${props.mode==='dark'? 'light' : 'dark'}`} htmlFor="flexSwitchCheckDefault">Enable {props.mode==='dark'? 'light' : 'dark'} mode</label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar