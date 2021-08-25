import React from 'react';
import './Header.css';
import { useHistory } from "react-router-dom";
import logo from "../../Styles/images/listerlogo.png";

export default function Header(props) {
  const history = useHistory();
 
  const logout=(e)=>{
    history.push('/')
    localStorage.removeItem('user');
  }
    return(
    <header className="topbar">
    <img src={logo} alt="Lister Technologies" className="logo"/>
    <h4 className="heading">Employee Onboarding System</h4>

    <button className="logout-btn" type="button" onClick={e => logout(e)}>Logout</button>
    </header>
)
}