import React, { useMemo ,useState} from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import Notifications from "../Notifications";
import UserDetailsView from "../UserDetailsView/UserDetailsView";
import { AiFillEye } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import './HrTable.css'
// import '../../../node_modules/font-awesome/css/font-awesome.min.css';

const HrTable = props => {
  const columns = [
    {
      name: "Employee Id",
      selector: "empid",
      sortable: true,
      width : "175px"
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      width : "225px"
      
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width : "250px"
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      width : "175px"
    },
    {
      name: "Created At",
      selector: "createdat",
      sortable: true,
      width : "175px"
      
    },
    {
      name: "Actions",
      width : "200px",
      cell : row => {
        if(row.status==="Incomplete")
        return <button className="button-group-small" onClick={e=>openNotification(row.empid)}>Notify</button>
        else if(row.status==="Pending")
        return (<><button className="view-pending" onClick={e=>openView(row)}><AiFillEye></AiFillEye></button></>)
        else if(row.status === "Completed")
        return (<><button className="button-group-small" onClick={e=>openEdit(row.empid)}>Edit</button><button className="viewicon" onClick={e=>openView(row)}><AiFillEye></AiFillEye></button></>)
        else
        return (<><button className="button-group-small" onClick={e=>openNotification(row.empid)}>Notify</button><button className="viewicon" onClick={e=>openView(row)}><AiFillEye></AiFillEye></button></>)
      },
      
    }
  ];
  const [openAlert, setOpenAlert] = useState(false);
  const [content, setContent] = useState("");
  const [rowdata,setRowdata]=useState({});
  const [userDetails,setUserDetails]=useState(false);
  const [rejectUser,setRejectUser]=useState(false);
  const [approveUser,setApproveUser]=useState(false);
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [reason,setReason]=useState("");
  const submitreason=()=> {
    setIsSubmitted(true);
    if(reason!==""){
      setRejectUser(!rejectUser);
      setReason("");
    }
    console.log(reason);
  }
 const handleChange = (e) => {
     setReason(e.target.value);
};

  const rejectback=()=>{
    setUserDetails(true);
    setRejectUser(false);

  }
  const closeall=()=>{
    setRejectUser(false);
  }

  const openView=(row)=>{
    console.log(row)
    setRowdata(row);
    setUserDetails(!userDetails)
  }
  const closeView=()=>{
    setUserDetails(!userDetails)
  }
  const openEdit=(id)=>{
    console.log(id);
    setContent("Access Provided")
    setOpenAlert(!openAlert);
  }
  const openNotification=(id)=>{
    console.log(id);
    setContent("Employee Notified")
    setOpenAlert(!openAlert);
  }
  const openApprove=(id)=>{
    console.log(id);
    setContent("Details forwarded to Greythr")
    setOpenAlert(!openAlert);
    setUserDetails(!userDetails)
  }
  const closeout=()=>{
      setOpenAlert(!openAlert);
  }
  const rejectview = () =>{
    setUserDetails(!userDetails)
    setRejectUser(!rejectUser);
  }
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
 
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
    <DataTable    
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
      {userDetails ? <UserDetailsView closeView={closeView} approve={openApprove} reject={rejectview} employeedetails={rowdata} ></UserDetailsView>:<></>}
  {openAlert ? <Notifications onClose={closeout} Content={content}></Notifications>:<></>}
  {rejectUser ?  
  <div id="myModal" className="modal fades">
      <div className="modal-head">
        <h4 className="modal-top alert-text">Reason For Rejection</h4>
        <button type="button" className="modal-close-button" onClick={e=>closeall()}>&times;</button>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <div>
            <div className="flex-form">
              <textarea type="text" name="reason" rows="4" cols="40"  onChange={(e) => handleChange(e)} placeholder="Reason for Rejection..."></textarea>
              <button className="button-group-modal" onClick={e=>submitreason()}><BiPaperPlane></BiPaperPlane></button>
            </div>
            {isSubmitted===true && reason==="" ?<span className="invalid-feedback">
              <sup>*</sup>reason is required
            </span>:<></>}
          </div>
          <div className="modal-foot-center">
            <button type="button" className="button-group-reject" onClick={e=>rejectback()}>Back</button>
          </div>

        </div>

      </div>
    </div>:<></>}
    </div>
  );
};

export default HrTable;