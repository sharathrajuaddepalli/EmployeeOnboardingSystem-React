import React ,{ useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios'
import logo from "../Styles/images/listerlogo.png";
import '../Styles/LoginPage.css';


export default function LoginPage(){
  const history = useHistory();
  useEffect(()=>{
    if(localStorage.getItem('user')==='HR'){
      history.push('/hr')
    }
    else if(localStorage.getItem('user')==='Employee'){
      history.push('/employee')
    }
  })
  const { register, handleSubmit, formState: { errors } } = useForm();
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const changeUserName= (e)=>{
        setUserName(e.target.value)
    }
    const changePassword= (e)=>{
        setPassword(e.target.value)
    }
   
   const loginmethod=(data)=> {
      console.log(data);
      console.log(userName,password)
      axios.post(process.env.REACT_APP_BASE_URL+'/login', { email: userName, password: password })
      .then((result) => {
         console.log(result);
      });
      if (userName === 'hr@gmail.com') {
        localStorage.setItem('user', 'HR');
        history.push('/hr')
      }
      else if (userName === 'user@gmail.com') {
        localStorage.setItem('user', 'Employee');
        history.push('/employee');
      }   
      }
    return(
        <div className="bgsetup">
          <img src={logo} alt="Lister Technologies" className="logo-login"></img>
          <div className="formdiv">
            <Form onSubmit={handleSubmit(loginmethod)}>
              <div className="container">
                <label className="login-label" htmlFor="email">Username:</label>
                <input type="text" id="name" name="user_email"  autoComplete="off"
                {...register('user_email',({
                  required: '*Username is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "*Please enter a valid username"
                  }
                }))}
                className={`${errors.user_email ? 'input-data alert' : 'input-data'}`}
                 placeholder="Username" onChange={e=>changeUserName(e)}/>
                   {errors.user_email && (
            <div className="invalid-feedback" style={{top: '69px',left: '131px'}}><span>{errors.user_email.message}</span></div>
          )}
                </div>
              
      
              <div className="container">
                <label className="login-label" htmlFor="email">Password:</label>
                <input type="password"  name="user_password"  id="pass"
                {...register('user_password',({
                  required: '*Password is required.',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                    message: "*Please enter a valid password"
                  },
                  minLength: {
                    value: 8,
                    message: "*Password should have atleast 8 characters."
                  }
                }))}
                className={`${errors.user_password ? 'input-data alert' : 'input-data'}`}
                id="Password" placeholder="Password" onChange={e=>changePassword(e)}/><br />
                {errors.user_password && (
            <div className="invalid-feedback" style={{top: "163px",left: "131px"}}><span>{errors.user_password.message}</span></div>
          )}
              </div>
              
              <br />
              <button className="button-group" id="myBtn" type="submit">Login</button>
            </Form>
          </div>
        </div>)
}
