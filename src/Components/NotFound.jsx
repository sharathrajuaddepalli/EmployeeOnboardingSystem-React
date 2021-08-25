
import React from 'react';
import { useHistory } from "react-router-dom";


export default function NotFound(){
    const history = useHistory();
    const moveback=()=>{
        const user=localStorage.getItem('user');
        if(user==='HR'){
            history.push('/hr')
        }
        else{
            history.push('/employee') 
        }

    }
    return(<div><h3>Page that you are looking for does not exist!!!</h3>
     <button style={{marginLeft: "379px"}} class="button-group" onClick={e=>moveback()} >Back</button>
     </div>

        )
}