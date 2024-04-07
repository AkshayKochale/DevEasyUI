import perform from "./EncodeDecode"

function Encoding()
{

        function performHelper(type)
        {
            perform(type);
        }

        return(
            <>
                <div className="encodingMain" id="encodingMain">
                    <div className="enInputOption">
                    <button className="encode-btn" onClick={()=>performHelper("URLEncode")} >URLEncode</button> 
                    <button className="encode-btn" onClick={()=>performHelper("URLDecode")}>URLDecode</button> 

                    <button className="encode-btn" onClick={()=>performHelper("StringEncode")}>StringEncode</button> 
                    <button className="encode-btn" onClick={()=>performHelper("StringDecode")}>StringDecode</button> 
                    </div>
                    <div className="enOutputOption">
                        {/* <span className="encodeOutputTitle"> Result</span> */}
                    <button className=" encode-btn encodecopySpan" id ="encodecopySpan">Copied!!!</button>     
                    <button className="encode-btn" onClick={()=>performHelper("Copy")}>Copy</button> 
                    <button className="encode-btn" onClick={()=>performHelper("MoveToInput")}>MoveToInput</button> 
                    </div>
                    <textarea className="encodeInput" id="encodeInput" />
                    <div className="encodeOutput" id="encodeOutput"></div>
                </div>
            </>
        )
}


export default Encoding;