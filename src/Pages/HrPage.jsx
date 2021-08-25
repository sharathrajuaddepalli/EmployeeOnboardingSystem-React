import React ,{useState} from 'react';
import Header from '../Components/Header';
import Notifications from '../Components/Notifications';
import CreateInvite from '../Components/CreateInvite';
import HrTable from '../Components/HrTable';
import styled from 'styled-components';
import '../Styles/HrPage.css';
import data from '../Utils/data.js';
import ScrollToTop from '../Components/ScrollToTop';

const Styles = styled.div`
.rdt_Table {
  font-family:arial,sans-serif; 
  border-collapse: collapse;
  width : 95%;
  overflow-x:hidden;
}
.jelNoK{
  cursor: pointer;
  height: 24px;
}
.gtywLv .jmxzRk, .gtywLv .fBJoFv, .gtywLv .jmxzRk {
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding-right: 8px;
  padding-left: 8px;
  width: 100%;
  color: rgba(0,0,0,0.54);
  font-size: 13px;
  min-height: 56px;
  background-color: #FFFFFF;
}
.jmxzRk {
   display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding-right: 8px;
  padding-left: 8px;
  width: 100%;
  color: rgba(0,0,0,0.54);
  font-size: 13px;
  min-height: 56px;
  background-color: #FFFFFF;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #FFFFFF;
}
.hcxOIW svg {
  right: 39px;
  color: inherit;
  position: absolute;
  fill: currentColor;
  width: 24px;
  height: 24px;
  display: inline-block;
  user-select: none;
  pointer-events: none;
}
.hcxOIW {
  position: relative;
  width:120px
  
}
.fuQFLU .hcxOIW,.jKztig ,.iBIgRz{
  top: 258px;
  position: absolute;
  width: 120px;
  left: 111px;
}
.rdt_TableRow{
  height : 60px;
}
.rdt_TableRow: nth-child(even) {
  background-color:#dddddd;
}
.rdt_TableCol {
  color: white;
  font-size : 16px;
}
.rdt_TableCol_Sortable{
  font-weight : bold;
}
.hkcGBu {
  overflow: hidden;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rdt_TableHeader {
  background-color: transparent;
}
.rdt_TableHead {
  
}
.rdt_TableHeadRow {
  background-color: #346751;
}
.rdt_TableCell {
  font-weight : bold;
  font-size : 16px;
  font-family:arial,sans-serif; 
  
}
.button-view,.button-edit,.button-notify,.view{
  background-color: #346751;
  color:white;
  width:60px;
  cursor:pointer;
  border-radius:8px;
}
.jsTYsS {
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 2px solid #346751;
  padding: 0 32px 0 16px;
}

.button-group-small{
  color: white;
  border: 1px solid #ccc;
  background-color: #346751;
  border-radius: 8px;
  width:65px;
  height:35px;
}
.viewicon,.view-pending{
 border:none;
 background-color:inherit;
 float:right
}
`



export default function HrPage(props){
 
  const [invite,setInvite]=useState(false);
  
  const openform=()=>{
    setInvite(!invite)
  }


    return(<div>
        <Header logout={props.logout}/>
        <div id="interface">
    <div className="heading-2">
      <h1 style={{position: "absolute",left: "122px", top: "74px"}}>HR Dashboard</h1>
      <button className="button-group" style={{position: 'absolute',left: '1141px', top: '192px'}} onClick={e=>openform()} >Create Invite</button>

    </div>
    
      
  
        <Styles style={{marginTop:"130px"}}>
      <HrTable data={data} />
      </Styles>
  
  {invite ?<CreateInvite close={openform}></CreateInvite>:<></>}
  
    </div>
    <ScrollToTop></ScrollToTop>
  </div>)
}