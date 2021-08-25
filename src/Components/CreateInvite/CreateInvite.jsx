import React, { useState } from "react";
import Axios from 'axios'
import axios from "../../Utils/axios";

import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form"

import './CreateInvite.css';




export default function CreateInvite(props) {
    const { register, handleSubmit, formState: { errors },clearErrors,reset  } = useForm();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const changeName = (e) => {
        clearErrors('firstname');
        setName(e.target.value)
    }
    const changeEmail = (e) => {
        clearErrors('email');
        setEmail(e.target.value)
    }
    const changeRole = (e) => {
        clearErrors('role');
        setRole(e.target.value)
    }
    const changePassword = (e) => {
        clearErrors('password');
        setPassword(e.target.value)
    }

    function createUser(data) {
        console.log(data);
        const dats2=JSON.stringify(data, null, 4)
        console.log(dats2);
        console.log(name, email, role, password)
        Axios.post(process.env.REACT_APP_BASE_URL+'/createuser', { name: name, email: email, role: role, password: password })
            .then((result) => {
                console.log(result);
            });
            props.close()
    }
    return (
        <div className="create-invite-modal" >
            <div className="create-invite-modal-content" >
                <div className="create-invite-modal-head">

                    <h4 className="modal-top alert-text" style={{ marginLeft: 12 }}>Create Invite</h4>
                    <button type="button" className="modal-close-button-invite" onClick={props.close}>&times;</button>
                </div>

                <Form className="form-class" onSubmit={handleSubmit(createUser)} onReset={reset}>
                <div className="fields">
                        <div className="create-invite-container">
                            <label className="other-label" htmlFor="name">Name:</label>
                            <input id="username" name="firstname"
                                className="create-invite-input"
                                autoComplete="off"
                                placeholder="name"
                                onChange={e => changeName(e)}
                                {...register('firstname', ({
                                    required: '*Employee Name is required',
                                }))}
                                className={`${errors.firstname ? 'create-invite-input alert' : 'create-invite-input'}`}
                            />
                            {errors.firstname && (
                                <span className="create-invite-invalid-feedback">{errors.firstname?.message}</span>
                            )}
                        </div>
                         <div className="create-invite-container"> 
                            <label className="other-label" htmlFor="name">Email:</label>
                            <input id="email" name="email"
                                className="create-invite-input"
                                autoComplete="off"
                                placeholder="email"
                                onChange={e => changeEmail(e)}
                                {...register('email', ({
                                    required: '*Email is required',
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "*Please enter a valid Email"
                                    }
                                }))}
                                className={`${errors.email ? 'create-invite-input alert' : 'create-invite-input'}`}
                            />
                            {errors.email && (
                                <span className="create-invite-invalid-feedback">{errors.email?.message}</span>
                            )}
                        </div>
                        <div className="create-invite-container">
                            <label className="rolelabel" htmlFor="role">Role:</label>
                            <select id="role" name="role"
                                onChange={e => changeRole(e)}
                              {...register('role', ({
                                    required: '*Role is required',
                                }))}
                                className={`${errors?.role ? 'create-invite-select alert' : 'create-invite-select'}`}
                            >
                                <option value="" defaultValue>Select Role</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Senior Software Engineer">Senior Software Engineer</option>
                                <option value="Senior Software Engineer">Associate Software Engineer</option>
                                <option value="HR">HR</option>

                            </select>
                            {errors.role && (
                                <span className="create-invite-invalid-feedback">{errors.role?.message}</span>
                            )}
                        </div>
                     
                        <div className="create-invite-container">
                            <label className="other-label" htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password"
                                onChange={e => changePassword(e)}
                                {...register('password', ({
                                    required: '*Password is required.',
                                    pattern: {
                                        value: "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/",
                                        message: "*Please enter a valid password"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "*Password should have atleast 8 characters."
                                    }
                                }))}
                                className={`${errors?.password ? 'create-invite-input alert' : 'create-invite-input'}`}
                                placeholder="Password" onChange={e => changePassword(e)} /><br />
                            {errors.password && (
                              <span className="create-invite-invalid-feedback">{errors.password?.message}</span>
                            )}
                        </div>

                        <button className="button-group-invite" id="myBtn" type="submit">Invite</button>
                        </div>
                </Form>

            </div>
        </div>
    )
}
