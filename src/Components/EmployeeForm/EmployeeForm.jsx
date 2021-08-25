import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import ScrollToTop from '../ScrollToTop';
import AddressDetails from './AddressDetails';
import './BasicDetails.css';



export default function EmployeeForm(){
    const [current,setCurrent]=useState(0);
    const [BasicDetails,setBasicDetails]=useState({});
    const { register, handleSubmit, formState: { errors } ,clearErrors,reset  } = useForm();
   const prev=()=>{
       setCurrent(0)
   }
    function getBasicDetails(data) {
        console.log(data);
        setCurrent(1);
        setBasicDetails(data);
      
    }
    return(
<div>
    <div>
        <div 
        className="class1">
            <ul className="progressbar">
                <li className={`${current===1 ?'step' :'active'}`}>Basic Details</li>
                <li className={`${current===0 ?'step' :'active'}`}>Address</li>
            </ul>
        </div>
        <form className={`${current === 1 ? 'tab': 'form-set' }`}  onSubmit={handleSubmit(getBasicDetails)} onReset={reset}>
            <div>
            
                <div className="wholefieldset">
                <h3 id="basictag"  style={{backgroundColor:"#2F5D62",height:"50px" }}>
                        Basic Details
                    </h3>
                    <fieldset id="field1">

                        <div className="employee-form-container">
                            <label htmlFor="FirstName" className="employee-label" id="f1"><b>First Name</b></label>
                            <input type="text"  placeholder="Enter First Name" name="firstname"
                               {...register('firstname', ({
                                required: '*first Name is required',
                                pattern:{
                                    value:/^[a-zA-Z]*$/,
                                    message:"*first name should contain alphabets"
                                }
                            }))}
                            className={`${errors.firstname ? 'input-employee-form alerts' : 'input-employee-form'}`}
                                 autoFocus />
                              
                        </div>
                        {errors.firstname && (
                                <div className="form-invalid-feedback">{errors.firstname?.message}</div>
                            )}

                        <div className="employee-form-container">
                            <label htmlFor="LastName" className="employee-label"><b>Last Name</b></label>
                            <input type="text"  name="lastname" placeholder="Enter last name"  {...register('lastname', ({
                                required: '*last Name is required',
                                pattern:{
                                    value:/^[a-zA-Z]*$/,
                                    message:"*last name should contain alphabets"
                                }
                            }))}
                            className={`${errors.lastname ? 'input-employee-form alerts' : 'input-employee-form'}`} />
                                 
                        </div>
                        {errors.lastname && (
                                <div className="form-invalid-feedback">{errors.lastname?.message}</div>
                            )}
                            <div>
                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="PhoneNumber"><b>Contact Number</b></label>
                            <input type="tel" {...register('phonenumber', ({
                                required: '*contact number is required',
                                pattern:{
                                    value:/^[0-9\b]+$/,
                                    message:"*contact number should contain numbers"
                                },
                                minLength:{
                                    value:10,
                                    message:"*Contact Number should have 10 digits"
                                }
                            }))}
                            className={`${errors.phonenumber ? 'input-employee-form alerts' : 'input-employee-form'}`}
                            placeholder="Enter Contact Number"  name="phonenumber"  />
                        </div>
                        {errors.phonenumber && (
                                <div className="form-invalid-feedback">{errors.phonenumber?.message}</div>
                            )} 
                            </div>
                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="EmailID"><b>Email ID</b></label>
                            <input type="text"  placeholder="Enter Email ID"
                             name="email"
                             {...register('email', ({
                                required: '*email is required',
                                pattern:{
                                    value:/\S+@\S+\.\S+/,
                                    message:"*enter a valid email"
                                }
                            }))}
                            className={`${errors.email ? 'input-employee-form alerts' : 'input-employee-form'}`} id="email"
                                 />
                        </div>
                        {errors.email && (
                                <div className="form-invalid-feedback">{errors.email?.message}</div>
                            )} 

                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="blood"><b>Blood Group</b></label>
                            <select id="bloodGroup"
                            {...register('bloodgroup', ({
                                required: '*bloodgroup is required',
                            }))}
                            className={`${errors.bloodgroup ? 'blood-select alerts' : 'blood-select'}`}
                             placeholder="Enter Blood Group"
                                 name="bloodgroup">
                                <option value="" defaultValue>--- Please select ---</option>
                                <option value="O+ve">O +ve</option>
                                <option value="O-ve">O -ve</option>
                                <option value="B+ve">B +ve</option>
                                <option value="B-ve">B -ve</option>
                                <option value="A+ve">A +ve</option>
                                <option value="A-ve">A -ve</option>
                                <option value="AB+ve">AB +ve</option>
                                <option value="AB-ve">AB -ve</option>
                            </select>
                        </div>{errors.bloodgroup && (
                                <div className="form-invalid-feedback">{errors.bloodgroup?.message}</div>
                            )} 

                        
                        


                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="aadhar"><b>Aadhar Number</b></label>
                            <input type="text" 
                            
                            {...register('aadharNumber', ({
                                required: '*aadhar number is required',
                                pattern:{
                                    value:/[0-9]*/,
                                    message:"*enter a valid aadhar number"
                                },
                                minLength:{
                                    value: 12,
                                    message: "Aadhar number should  contain 12 digits"
                                },
                                maxLength:{
                                    value: 12,
                                    message: "Aadhar number should only contain 12 digits"
                                }
                            }))}
                            className={`${errors.aadharNumber ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Enter Aadhar Number" name="aadharNumber" id="aadharNumber"
                                />
                        </div>
                        {errors.aadharNumber && (
                                <div className="form-invalid-feedback">{errors.aadharNumber?.message}</div>
                            )} 



                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="dob"><b>Date Of Birth</b></label>
                            <input type="text" 
                              {...register('dob', ({
                                required: '*dob is required',
                            }))}
                            className={`${errors.dob ? 'input-employee-form alerts' : 'input-employee-form'}`}
                             name="dob" id="dob"  placeholder="MM/DD/YY"
                                 onFocus={
                                    (e)=> {
                                      e.currentTarget.type = "date";
                                      e.currentTarget.focus();
                                     }
                                   }
                                   onBlur={(e) => (e.currentTarget.type = "text")}
                                   placeholder="Select DOB" />

                        </div>
                        {errors.dob && (
                                <div className="form-invalid-feedback">{errors.dob?.message}</div>
                            )} 


                        <div className="radio">
                            <label className="employee-label" htmlFor="gender" className="genderlabel"><b>Gender</b></label>
                            <div className="gendersetup"><input type="radio" id="male" name="gender"     {...register('gender', ({
                                required: '*gender is required',
                            }))} value="male"  />
                            <p className="paragraphgender">Male</p>
                            <input type="radio" id="female" name="gender"  {...register('gender', ({
                                required: '*gender is required',
                            }))} value="female"  />
                            <p className="paragraphgender">Female</p>
                            </div>
                        </div>
                        {errors.gender && (
                                <div className="form-invalid-feedback">{errors.gender?.message}</div>
                            )} 


                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="sslc"><b>SSLC Score</b></label>
                            <input type="text"   {...register('sslc', ({
                                required: '*SSLC score is required',
                            }))}
                            className={`${errors.sslc ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Percentage or CGPA" name="sslc" id="sslc"
                                 />
                        </div>
                        {errors.sslc && (
                                <div className="form-invalid-feedback">{errors.sslc?.message}</div>
                            )} 



                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="hsc"><b>HSC Score</b></label>
                            <input type="text" {...register('hsc', ({
                                required: '*HSC score is required',
                            }))}
                            className={`${errors.hsc ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Percentage or CGPA" name="hsc" id="hsc"
                                 />
                        </div>
                        {errors.hsc && (
                                <div className="form-invalid-feedback">{errors.hsc?.message}</div>
                            )} 



                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="ug"><b>UG Score</b></label>
                            <input type="text"  {...register('ug', ({
                                required: '*UG score is required',
                            }))}
                            className={`${errors.ug ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Percentage or CGPA" name="ug" id="ug"  />
                        </div>

                        {errors.ug && (
                                <div className="form-invalid-feedback">{errors.ug?.message}</div>
                            )} 

                        <div className="employee-form-container">
                            <label className="employee-label"htmlFor="fatherName"><b>Father's Name</b></label>
                            <input type="text"  {...register('fathername', ({
                                required: '*father name is required',
                            }))}
                            className={`${errors.fathername ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Enter Father's Name" name="fathername" id="fatherName"
                                 />
                        </div>
                        {errors.fathername && (
                                <div className="form-invalid-feedback">{errors.fathername?.message}</div>
                            )} 


                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="motherName"><b>Mother's Name</b></label>
                            <input type="text" {...register('mothername', ({
                                required: '*mother name is required',
                            }))}
                            className={`${errors.mothername ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Enter Mother's Name" name="mothername" id="motherName"
                                 />
                        </div>
                        {errors.mothername && (
                                <div className="form-invalid-feedback">{errors.mothername?.message}</div>
                            )} 


                        <h3 
                        className="sub-division">
                          Emergency Contact
                        </h3>
                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="emergencyContactName"><b>Name</b></label>
                            <input type="text"  {...register('emergencyContactName', ({
                                required: '*emergency contact name is required',
                            }))}
                            className={`${errors.emergencyContactName ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Name Of the Person" name="emergencyContactName"
                                id="emergencyContactName"  />
                        </div>
                        {errors.emergencyContactName && (
                                <div className="form-invalid-feedback">{errors.emergencyContactName?.message}</div>
                            )} 

                        <div className="employee-form-container">
                            <label className="employee-label" htmlFor="relation"><b>Relationship</b></label>
                            <input type="text" {...register('relation', ({
                                required: '*emergency contact relation is required',
                            }))}
                            className={`${errors.relation ? 'input-employee-form alerts' : 'input-employee-form'}`} placeholder="Relationship" name="relation" id="relation"
                                 />
                        </div>
                        {errors.relation && (
                                <div className="form-invalid-feedback">{errors.relation?.message}</div>
                            )} 


                        <div className="employee-form-container" id="present">
                            <label className="employee-label" htmlFor="emergencyContactNumber"><b>Contact Number</b></label>
                            <input type="tel" {...register('emergencyContactNumber', ({
                                required: '*emergency contact number is required',
                                pattern:{
                                    value:/^[0-9\b]+$/,
                                    message:"*contact number should contain numbers"
                                }
                            }))}
                            className={`${errors.relation ? 'input-employee-form alerts' : 'input-employee-form'}`}  placeholder="Enter Contact Number" name="emergencyContactNumber"
                                id="emergencyContactNumber"  />
                        </div>
                        {errors.emergencyContactNumber && (
                                <div className="form-invalid-feedback">{errors.emergencyContactNumber?.message}</div>
                            )} 


                    </fieldset>
                </div>

                <button type="submit" className="firstbutton" id="nextBtn">Next</button>

            </div>
            <ScrollToTop></ScrollToTop>
        </form>
 <AddressDetails current={current} BasicDetails={BasicDetails} prev={prev}></AddressDetails>


    </div>
</div>
)
}

