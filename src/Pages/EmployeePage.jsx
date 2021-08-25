import React,{useState} from 'react';
import Header from '../Components/Header';
import Notifications from '../Components/Notifications';
import EmployeeForm from '../Components/EmployeeForm';

export default function EmployeePage(props){
    const [openAlert, setOpenAlert] = useState(false);
    const closeout=()=>{
        setOpenAlert(!openAlert);
    }
    return(<div>
              <Header logout={props.logout}/>
        <EmployeeForm></EmployeeForm>
        {/* <h3 style={{marginTop:'100px'}}>Employee Page Works!!</h3> */}
        {/* <button onClick={closeout}>click!</button> */}
        {openAlert ? <Notifications onClose={closeout} Content={"hello this is notification"}></Notifications>:<></>}
        </div>)
}