import { useEffect } from "react";
import { expand } from './Operation.jsx';

import perform from "./Operation"

function JsonCom()
{
    function callPerformOperation(event,type)
    {
        perform(event,type);
    }

    return(
        
            <div className="jsonMainDiv" id ="jsonMainDiv">

                    <div className="json-toolBar">
                        <span className="input-toolBar">
                        <span className="copied-input copySpan" id="copied-input">Copied!!!</span>   
                        <button onClick={(e)=>callPerformOperation(e,"inputCopy")}>Copy</button>
                        <button onClick={(e)=>callPerformOperation(e,"stringToJson")}>StringToJson</button>
                        <button onClick={(e)=>callPerformOperation(e,"validate")}>Validate</button>
                        <button onClick={(e)=>callPerformOperation(e,"clear")}>Clear</button>
                        </span>
                        <span className="output-toolBar">
                        <span className="copied-output copySpan" id="copied-output">Copied!!!</span>    
                        <button onClick={(e)=>callPerformOperation(e,"outputCopy")}>Copy</button>
                        <button onClick={(e)=>callPerformOperation(e,"copyAsString")}>CopyAsString</button>
                        <button onClick={(e)=>callPerformOperation(e,"moveToInput")}>MoveToInput</button>
                        <button onClick={(e)=>callPerformOperation(e,"toSingleLine")}>ToSingleLine</button>
                        <button onClick={(e)=>callPerformOperation(e,"beautify")}>Beautify</button>
                        </span>
                    </div>       
                    <textarea className="json-area" id="json-area" />
                <div className="main-numeric" id="main-numeric"></div> 
                <div className="output-area" id="output-area"> </div>
           </div>
    )

}







export default JsonCom;