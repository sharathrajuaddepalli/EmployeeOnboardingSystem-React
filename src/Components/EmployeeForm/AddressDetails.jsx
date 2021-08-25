import React, { useState, useEffect } from 'react';
import './BasicDetails.css';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import Notifications from '../Notifications';
import ScrollToTop from '../ScrollToTop';


export default function AddressDetails(props) {
    const [country, setCountry] = useState([]);
    const [presentStateInfo, setPresentStateInfo] = useState([]);
    const [permanentStateInfo, setPermanentStateInfo] = useState([]);
    const [presentStateName, setPresentStateName] = useState("");
    const [permanentStateName, setPermanentStateName] = useState("");
    const [content, setContent] = useState("");
    const [presentCountryName, setPresentCountryName] = useState("");
    const [permanentCountryName, setPermanentCountryName] = useState("");
    const [presentCountryCode, setPresentCountryCode] = useState(null);
    const [permanentCountryCode, setPermanentCountryCode] = useState(null);
    const [presentStateCode, setPresentStateCode] = useState(null);
    const [permanentStateCode, setPermanentStateCode] = useState(null);
    const [presentFlatName,setPresentFlatName]=useState("");
    const [presentStreetName,setPresentStreetName]=useState("");
    const [presentArea,setPresentArea]=useState("");
    const [presentCity,setPresentCity]=useState("");
    const [presentMapCoordinates,setPresentMapCoordinates]=useState("");
    const [presentPincode,setPresentPinCode]=useState("");
    const [permanentFlatName,setPermanentFlatName]=useState("");
    const [permanentStreetName,setPermanentStreetName]=useState("");
    const [permanentArea,setPermanentArea]=useState("");
    const [permanentCity,setPermanentCity]=useState("");
    const [permanentMapCoordinates,setPermanentMapCoordinates]=useState("");
    const [permanentPincode,setPermanentPinCode]=useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [isChecked,setIsChecked]=useState(false);
    const closeout = () => {
        setOpenAlert(!openAlert);
    }

    useEffect(() => {
        Axios.get("https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json")
            .then((result) => {
                console.log(result.data);
                setCountry(result.data.Countries);
            });
    }, [])
    const onChangeCountrypresent = (e) => {
        console.log("present country", e.target.value);
        setPresentCountryCode(e.target.value);
        setPresentStateInfo(country[e.target.value].States);
        setPresentCountryName(country[e.target.value].CountryName);

    }
    const onChangeCountrypermanent = (e) => {
        console.log("permanent country", e.target.value);
        setPermanentCountryCode(e.target.value);
        setPermanentStateInfo(country[e.target.value].States);
        setPermanentCountryName(country[e.target.value].CountryName);
    }

    const onChangeStatepresent = (e) => {
        console.log("present state", e.target.value);
        setPresentStateCode(e.target.value);
        setPresentStateName(presentStateInfo[e.target.value].StateName)
    }
    const onChangeStatepermanent = (e) => {
        console.log("permanent state", e.target.value);
        setPermanentStateCode(e.target.value);
        setPermanentStateName(permanentStateInfo[e.target.value].StateName)
    }


    const [current, setCurrent] = useState(0);
    const { register, handleSubmit, formState: { errors }, clearErrors,setValue, reset } = useForm();
    function getAddressDetails(data, e) {
        console.log(e,e.nativeEvent.submitter.classList[0], typeof e.nativeEvent.submitter.classList[0] );
        data.presentcountry = presentCountryName;
        data.presentstate = presentStateName;
        if(isChecked===true){
            data.permanentstate=presentStateName;
            data.permanentcountry=presentCountryName;
        }
        else{
            data.permanentstate = permanentStateName;
            data.permanentcountry = permanentCountryName;
        }
        console.log(data, props.BasicDetails);
        const mergedObject = {
            'basic details': props.BasicDetails,
            'address details': data,
        };
        const dats2 = JSON.stringify(mergedObject, null, 4)
        console.log(dats2);
       if(e.nativeEvent.submitter.classList[0]==="submitbtn"){
        setOpenAlert(!openAlert);
        setContent("Registration Completed")
        Axios.post(process.env.REACT_APP_BASE_URL+'/register', dats2)
            .then((result) => {
                console.log(result);
            });
       }
       else if(e.nativeEvent.submitter.classList[0]==="saveBtn"){
        setOpenAlert(!openAlert);
        setContent("Details Saved")
        Axios.post(process.env.REACT_APP_BASE_URL+'/save', dats2)
            .then((result) => {
                console.log(result);
            });
       }
        
    }
    const isSameAddress=(e)=>{
        console.log(isChecked)
        setIsChecked(!isChecked);
        console.log(isChecked)
        console.log(presentFlatName,presentStateCode,presentStreetName,presentCity,presentCountryCode,presentMapCoordinates,presentPincode,presentArea);
        
        if(!isChecked)
        {setPermanentFlatName(presentFlatName);
        setPermanentStreetName(presentStreetName);
        setPermanentArea(presentArea)
        setPermanentCountryCode(presentCountryCode)
        setPermanentStateInfo(country[presentCountryCode].States);
        setPermanentStateCode(presentStateCode)
        setPermanentCity(presentCity)
        setPermanentMapCoordinates(presentMapCoordinates);
        setPermanentPinCode(presentPincode)
        }
        else{
            setPermanentFlatName("");
        setPermanentStreetName("");
        setPermanentArea("")
        setPermanentCountryCode(null)
        setPermanentStateInfo([]);
        setPermanentStateCode(null)
        setPermanentCity("")
        setPermanentMapCoordinates("");
        setPermanentPinCode("")

        }
    }

    return (
        <div>
            <form className={`${props.current === 0 ? 'tab' : 'form-set'}`} onSubmit={handleSubmit(getAddressDetails)} onReset={reset} >
                <div >
                    <div className="wholefieldset1">
                        <h3 id="basictag" style={{ backgroundColor: "#2F5D62", height: "50px" }}>
                            Present Address
                        </h3>
                        <fieldset id="field1">
                            <div className="row">

                                <div className="column1">
                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentflatname"><b>Building No/Flat Name</b></label>
                                        <input type="text" className="input-address"
                                            {...register('presentflatname', ({
                                                required: '*present flat name is required'
                                            }))}
                                            onChange={e=>setPresentFlatName(e.target.value)}
                                            className={`${errors.presentflatname ? 'input-address alerts' : 'input-address'}`}
                                            placeholder="Enter Building No /Flat Name" name="presentflatname"
                                            autoFocus />
                                    </div>
                                    {errors.presentflatname && (
                                        <div className="address-form-invalid-feedback">{errors.presentflatname?.message}</div>
                                    )}

                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentstreetname"><b>Street</b></label>
                                        <input type="text"
                                            {...register('presentstreetname', ({
                                                required: '*present street name is required'
                                            }))}
                                            onChange={e=>setPresentStreetName(e.target.value)}
                                            className={`${errors.presentstreetname ? 'input-address alerts' : 'input-address'}`} placeholder="Enter Street" name="presentstreetname"
                                        />
                                    </div>
                                    {errors.presentstreetname && (
                                        <div className="address-form-invalid-feedback">{errors.presentstreetname?.message}</div>
                                    )}

                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentarea"><b>Area</b></label>
                                        <input type="text"
                                            {...register('presentarea', ({
                                                required: '*present area  is required'
                                            }))}
                                            onChange={e=>setPresentArea(e.target.value)}
                                            className={`${errors.presentarea ? 'input-address alerts' : 'input-address'}`}
                                            placeholder="Area" name="presentarea" />
                                    </div>
                                    {errors.presentarea && (
                                        <div className="address-form-invalid-feedback" style={{marginLeft:"60px"}}>{errors.presentarea?.message}</div>
                                    )}


                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentcountry"><b>Country</b></label>
                                        <select name="presentcountry"
                                            {...register('presentcountry', ({
                                                required: '*present country is required'
                                            }))}
                                            onChange={e => onChangeCountrypresent(e)}
                                            className={`${errors.presentcountry ? 'countries alerts' : 'countries'}`} id="countryId">

                                            <option value="">Select country...</option>
                                            {country.map((data, key) => (<option key={key} value={key} >{data.CountryName}</option>))}
                                        </select>
                                    </div>
                                    {errors.presentcountry && (
                                        <div className="address-form-invalid-feedback">{errors.presentcountry?.message}</div>
                                    )}
                                </div>

                                <div className="column2">
                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentstate"><b>State</b></label>
                                        <select name="presentstate"
                                            {...register('presentstate', ({
                                                required: '*present state is required'
                                            }))}
                                            onChange={e => onChangeStatepresent(e)}
                                            className={`${errors.presentstate ? 'countries alerts' : 'countries'}`} id="stateId">
                                            <option value="" >Select state...</option>
                                            {presentStateInfo.map((data, key) => (<option key={key} value={key} >{data.StateName}</option>))}
                                        </select>
                                    </div>
                                    {errors.presentstate && (
                                        <div className="address-form-invalid-feedback">{errors.presentstate?.message}</div>
                                    )}


                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentcity"><b>District</b></label>
                                        <input type="text"  {...register('presentcity', ({
                                            required: '*present city is required'
                                        }))}
                                        onChange={e=>setPresentCity(e.target.value)}

                                            className={`${errors.presentcity ? 'input-address alerts' : 'input-address'}`} placeholder="City" name="presentcity" id="presentcity"
                                        />

                                    </div>
                                    {errors.presentcity && (
                                        <div className="address-form-invalid-feedback">{errors.presentcity?.message}</div>
                                    )}



                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentmapcoordinates"><b>Map Coordinates</b></label>
                                        <input type="text" {...register('presentmapcoordinates', ({
                                            required: '*present map coordinates is required'
                                        }))}
                                        onChange={e=>setPresentMapCoordinates(e.target.value)}
                                            className={`${errors.presentmapcoordinates ? 'input-address alerts' : 'input-address'}`} placeholder="Enter Map Coordinates" id="presentmapcoordinates"
                                            name="presentmapcoordinates"
                                        />
                                    </div>
                                    {errors.presentmapcoordinates && (
                                        <div className="address-form-invalid-feedback" style={{marginLeft:"200px"}}>{errors.presentmapcoordinates?.message}</div>
                                    )}


                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="presentpincode"><b>Pincode</b></label>
                                        <input type="text" {...register('presentpincode', ({
                                            required: '*present pincode is required'
                                        }))}
                                        onChange={e=>setPresentPinCode(e.target.value)}
                                            className={`${errors.presentpincode ? 'input-address alerts' : 'input-address'}`} placeholder="Pincode" name="presentpincode" id="presentpincode"
                                        />
                                    </div>
                                    {errors.presentpincode && (
                                        <div className="address-form-invalid-feedback" style={{marginLeft:"136px"}}>{errors.presentpincode?.message}</div>
                                    )}

                                </div>

                            </div>
                            <div className="employee-form-container">
                                <input type="checkbox" value="" onChange={e=>isSameAddress(e)} className="checkboxstyle" />

                                <b className="acknowledgement"
                                >Select this Checkbox if the
                                    present
                                    and permanent addresses are
                                    same</b>
                            </div>


                            <h3 className="sub-division">
                                Permanent Address
                            </h3>
                            <br />
                            <div className="row">

                                <div className="column1">

                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentflatname"><b>Building No/Flat Name</b></label>
                                        <input type="text"  {...register('permanentflatname', ({
                                            required: '*permanent flat name is required'
                                        }))}
                                            className={`${errors.permanentflatname ? 'input-address alerts' : 'input-address'}`} placeholder="Enter Building No /Flat Name"
                                            name="permanentflatname"
                                            id="permanentflatname"
                                            value={permanentFlatName}
                                             />
                                    </div>
                                    {isChecked ?  setValue("permanentflatname",presentFlatName):""}
                                    {errors.permanentflatname && (
                                        <div className="address-form-invalid-feedback">{errors.permanentflatname?.message}</div>
                                    )}



                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentstreetname"><b>Street</b></label>
                                        <input type="text" {...register('permanentstreetname', ({
                                            required: '*permanent street name is required'
                                        }))}
                                            className={`${errors.permanentstreetname ? 'input-address alerts' : 'input-address'}`} placeholder="Enter Street"
                                            name="permanentstreetname"
                                            value={permanentStreetName}
                                            id="permanentstreetname" />
                                    {isChecked ?  setValue("permanentstreetname",permanentStreetName):""}
                                    </div>

                                    {errors.permanentstreetname && (
                                        <div className="address-form-invalid-feedback">{errors.permanentstreetname?.message}</div>
                                    )}

                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentarea"><b>Area</b></label>
                                        <input type="text" {...register('permanentarea', ({
                                            required: '*permanent area is required'
                                        }))}
                                            className={`${errors.permanentarea ? 'input-address alerts' : 'input-address'}`} placeholder="Area" name="permanentarea" id="permanentarea"
                                            value={permanentArea}
                                        
                                        />
                                         {isChecked ?  setValue("permanentarea",permanentArea):""}
                                    </div>
                                    {errors.permanentarea && (
                                        <div className="address-form-invalid-feedback" style={{marginLeft:"92px"}}>{errors.permanentarea?.message}</div>
                                    )}




                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentcountry"><b>Country</b></label>
                                        <select name="permanentcountry"
                                            {...register('permanentcountry', ({
                                                required: '*permanent country is required'
                                            }))}
                                            value={permanentCountryCode}
                                            onChange={e => onChangeCountrypermanent(e)}
                                            className={`${errors.permanentcountry ? 'countries alerts' : 'countries'}`}
                                            id="countryId"

                                        >
                                            <option value="">Select country...</option>
                                            {country.map((data, key) => (<option key={key} value={key} >{data.CountryName}</option>))}
                                        </select>
                                        {isChecked ?  setValue("permanentcountry",permanentCountryCode):""}
                                    </div>
                                    {errors.permanentcountry && (
                                        <div className="address-form-invalid-feedback">{errors.permanentcountry?.message}</div>
                                    )}
                                </div>

                                <div className="column2">
                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentstate"><b>State</b></label>
                                        <select name="permanentstate"
                                            {...register('permanentstate', ({
                                                required: '*permanent state is required'
                                            }))}
                                            value={permanentStateCode}
                                            onChange={e => onChangeStatepermanent(e)}
                                            className={`${errors.permanentstate ? 'countries alerts' : 'countries'}`} id="stateId"
                                        >
                                            <option value="">Select state...</option>
                                            {permanentStateInfo.map((data, key) => (<option key={key} value={key} >{data.StateName}</option>))}
                                        </select>
                                        <br />
                                        {isChecked ?  setValue("permanentstate",permanentStateCode):""}
                                    </div>
                                    {errors.permanentstate && (
                                        <div className="address-form-invalid-feedback">{errors.permanentstate?.message}</div>
                                    )}
                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentcity"><b>District</b></label>
                                        <input type="text" {...register('permanentcity', ({
                                            required: '*permanent city is required'
                                        }))}
                                        value={permanentCity}
                                            className={`${errors.permanentcity ? 'input-address alerts' : 'input-address'}`}
                                            placeholder="City"
                                            name="permanentcity"
                                            id="permanentcity"
                                        />
                                    {isChecked ?  setValue("permanentcity",permanentCity):""}

                                    </div>
                                    {errors.permanentcity && (
                                        <div className="address-form-invalid-feedback">{errors.permanentcity?.message}</div>
                                    )}

                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentmapcoordinates"><b>Map Coordinates</b></label>
                                        <input type="text" {...register('permanentmapcoordinates', ({
                                            required: '*permanent map coordinates is required'
                                        }))}
                                            className={`${errors.permanentmapcoordinates ? 'input-address alerts' : 'input-address'}`} placeholder="Enter Map Coordinates"
                                            name="permanentmapcoordinates"
                                            id="permanentmapcoordinates"
                                            value={permanentMapCoordinates}
                                        />
                                    {isChecked ?  setValue("permanentmapcoordinates",permanentMapCoordinates):""}
                                    </div>
                                    {errors.permanentmapcoordinates && (
                                        <div style={{marginLeft:"200px"}} className="address-form-invalid-feedback">{errors.permanentmapcoordinates?.message}</div>
                                    )}



                                    <div className="employee-form-container">
                                        <label className="address-label" htmlFor="permanentpincode"><b>Pincode</b></label>
                                        <input type="text"  {...register('permanentpincode', ({
                                            required: '*permanent pincode is required'
                                        }))}
                                            className={`${errors.permanentpincode ? 'input-address alerts' : 'input-address'}`} placeholder="Pincode" name="permanentpincode"
                                            id="permanentpincode"
                                            value={permanentPincode}
                                        />
                                    {isChecked ?  setValue("permanentpincode",permanentPincode):""}
                                    </div>
                                    {errors.permanentpincode && (
                                        <div className="address-form-invalid-feedback" style={{marginLeft:"136px"}}>{errors.permanentpincode?.message}</div>
                                    )}


                                </div>

                            </div>


                        </fieldset>
                    </div>
                    <div className="secondbutton">

                        <button type="button" className="previousbtn" id="prevBtn" onClick={props.prev} >Previous</button>
                        <button type="submit" className="submitbtn" id="submitBtn" >Submit</button>
                        <button type="submit" className="saveBtn" id="saveBtn" >Save</button>

                    </div>

                </div>
                <ScrollToTop></ScrollToTop>
            </form>
            {openAlert ? <Notifications onClose={closeout} Content={content}></Notifications> : <></>}
        </div>
    )

}

