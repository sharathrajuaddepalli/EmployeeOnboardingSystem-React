import {React} from 'react';
import './Notifications.css';


export default function Notifications(props) {
    return (
        <div id="myModal" className="modal-notify fades" onClick={props.onClose}>
            <div className="modal-content-notify">
                <div className="modal-body">
                    <p id="error" className="alert-text-notify">{props.Content}</p>
                </div>
                <div className="modal-foot-notify">
                    <button type="button" className="button-group-notify" onClick={props.onClose} id="closemodal">Close</button>
                </div>
            </div>
        </div>)
}