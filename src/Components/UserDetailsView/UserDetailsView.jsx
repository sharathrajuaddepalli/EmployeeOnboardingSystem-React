import React,{useState} from 'react';
import { useEffect } from 'react';
import { BiMinusCircle } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";
import './UserDetailsView.css';

export default function UserDetailsView(props){
  useEffect(()=>{
    console.log(props.employeedetails);
  })
  const [addressDetails,setAddressDetails]=useState(false);
  const [basicDetails,setBasicDetails]=useState(false);
  const openAddressDetails =()=>{
    if(basicDetails===true){
      setBasicDetails(!basicDetails);
    }
    setAddressDetails(!addressDetails);
  }
  const openBasicDetails =()=>{
    if(addressDetails===true){
      setAddressDetails(!addressDetails)
    }
    setBasicDetails(!basicDetails);
  }
    return(
    <div id="myModal" className="detail-modal fades">
      <div className="detail-modal-head">
      <h4 className="modal-top alert-text">User Details View</h4>
      <button type="button" className="xbtn" onClick={props.closeView}>&times;</button>
    </div>
    <div className="detail-modal-content">
    <div className="modal-body form-class">
      <div id="basicDetails">
      <div  style={{display:'flex'}}>
            <h3 className="user-heading">Basic Details</h3>
            {!basicDetails ?<button className="view-sub" onClick={e=>openBasicDetails()}><BiPlusCircle></BiPlusCircle></button>:<></>}
            {basicDetails ?<button className="view-sub" onClick={e=>openBasicDetails()}><BiMinusCircle></BiMinusCircle></button>:<></>}
          </div>
          {basicDetails ? 
          <div>
            <div className="grid-row">
              <p><b>Blood Group:</b>{props.employeedetails.basicDetails.bloodGroup}</p>
              <p><b>DOB:</b> {props.employeedetails.basicDetails.dob}</p>
              <p><b>Gender:</b> {props.employeedetails.basicDetails.gender}</p>
            </div>
            <div className="grid-row">
              <p><b>SSLC:</b> {props.employeedetails.basicDetails.SSLC} %</p>
              <p><b>HSC:</b> {props.employeedetails.basicDetails.HSC} %</p>
              <p><b>UG:</b> {props.employeedetails.basicDetails.UG} CGPA</p>
            </div>
            <div className="grid-row-2">
              <p><b>Father Name:</b>{props.employeedetails.basicDetails.fatherName}</p>
              <p><b>Mother Name:</b>{props.employeedetails.basicDetails.motherName}</p>
            </div>
            <div className="grid-row-2">
              <p><b>Mobile:</b> {props.employeedetails.basicDetails.ContactNumber}</p>
              <p><b>Aadhar:</b> {props.employeedetails.basicDetails.aadharNumber}</p>
            </div>
            <hr />
            <h4 className="sub-heading">Emergency Contact</h4>
            <div className="grid-row">
              <p><b>Name:</b>{props.employeedetails.basicDetails.emergencyContactName}</p>
              <p><b>Relation:</b>{props.employeedetails.basicDetails.emergencyContactRelation}</p>
              <p><b>Contact:</b>{props.employeedetails.basicDetails.emergencyContactNumber}</p>
            </div>
          </div>
       :<></>}

          </div>       
          <div id="addressDetails">
          <div style={{display:'flex'}}>
            <h3>Address Details</h3>
            {!addressDetails ?<button type="button"  className="view-sub" onClick={e=>openAddressDetails()}><BiPlusCircle></BiPlusCircle></button>:<></>}
            {addressDetails ?<button type="button"  className="view-sub" onClick={e=>openAddressDetails()}><BiMinusCircle></BiMinusCircle></button>:<></>}
            </div>
        {addressDetails ? 
          <div >
            <h4 className="sub-heading">Present Address</h4>
            <div className="grid-row">
              <p><b>Building No/Flat Name:</b>{props.employeedetails.addressDetails.presentAddress.buildingName}</p>
              <p><b>Street:</b>{props.employeedetails.addressDetails.presentAddress.streetName}</p>
              <p><b>Area:</b>{props.employeedetails.addressDetails.presentAddress.area}</p>
            </div>
            <div className="grid-row">
              <p><b>City:</b>{props.employeedetails.addressDetails.presentAddress.city}</p>
              <p><b>State:</b>{props.employeedetails.addressDetails.presentAddress.state}</p>
              <p><b>Country:</b>{props.employeedetails.addressDetails.presentAddress.country}</p>
            </div>
            <div className="grid-row-2">
              <p><b>Map:</b>{props.employeedetails.addressDetails.presentAddress.mapCoordinates}</p>
              <p><b>Pincode:</b>{props.employeedetails.addressDetails.presentAddress.pinCode}</p>
            </div>
            <hr />
            <h4 className="sub-heading">Permanent Address</h4>
            <div className="grid-row">
              <p><b>Building No/Flat Name:</b>{props.employeedetails.addressDetails.permanentAddress.buildingName}</p>
              <p><b>Street:</b>{props.employeedetails.addressDetails.permanentAddress.streetName}</p>
              <p><b>Area:</b>{props.employeedetails.addressDetails.permanentAddress.area}</p>
            </div>
            <div className="grid-row">
              <p><b>City:</b>{props.employeedetails.addressDetails.permanentAddress.city}</p>
              <p><b>State:</b>{props.employeedetails.addressDetails.permanentAddress.state}</p>
              <p><b>Country:</b>{props.employeedetails.addressDetails.permanentAddress.country}</p>
            </div>
            <div className="grid-row-2">
              <p><b>Map:</b>{props.employeedetails.addressDetails.permanentAddress.mapCoordinates}</p>
              <p><b>Pincode:</b>{props.employeedetails.addressDetails.permanentAddress.pinCode}</p>
            </div>
          </div>
  :<></>}  
</div>
</div>
{props.employeedetails.status==="Rejected" ? 
       <div className="flex-form">
          <h4>Reason for Rejection:</h4>
          <h4 className="invalid-feedback-view">{props.employeedetails.reasonForRejection}</h4>
        </div> :<></>} 

        <div className="modal-foot-right-view">
          {props.employeedetails.status !== "Pending" ? <button type="button" className="button-group-view" onClick={props.closeView}>Close</button>:<></>}
          {props.employeedetails.status==="Pending" ?
          <div>
          <button type="button"  className="button-group-view" onClick={props.approve}>Approve</button>
          <button type="button" className="button-group-view" onClick={props.reject}>Reject</button>
            </div>:<></>}
        </div>
      </div>
    </div>) 
}