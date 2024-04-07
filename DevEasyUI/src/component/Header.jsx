import { useEffect, useState,useContext } from "react";
import perform from "./Operation"

function Header()
{
    const headList=["Json","List Comparison","Encoding/Decoding"];
    
    function addSubHeaders(type)
    {
            const selectedOpt=document.getElementById("Json");
            const listOpt=document.getElementById("List Comparison");
            const EconDecOpt=document.getElementById("Encoding/Decoding");
            console.log(type);

            selectedOpt.style.color="white";
            listOpt.style.color="white";
            EconDecOpt.style.color="white";

            const jsonTab= document.getElementById("jsonMainDiv");
            const listTab= document.getElementById("listMainpage");
            const encodingTab= document.getElementById("encodingMain");
            
            if(type=='Json')
            {
                // setSubHeader(jsonList);
                selectedOpt.style.color="#feda6a";
                jsonTab.style.display='flex';
                listTab.style.display='none';
                encodingTab.style.display="none"
            }
            else if(type=='List Comparison')
               {  
                    // setSubHeader(List);
                    listOpt.style.color="#feda6a";
                    jsonTab.style.display='none';
                    listTab.style.display="grid";
                    encodingTab.style.display="none"
               }
               else
               {
                     EconDecOpt.style.color="#feda6a";
                     encodingTab.style.display="flex"
                     listTab.style.display='none';
                     jsonTab.style.display='none';
               }
        }

       
        function reportError()
        {

        }
        
    return(
        <>
            <ul className="headerList">
                <li className="main-name">DevEasy</li>
                {
                    headList.map(e=>(<li className="header-opt" key={e} id={e} onClick={()=>addSubHeaders(e)}>{e}</li>))
                }
                <li className="reportbug">Report <i className="fa-solid fa-bug" onClick={reportError}></i></li>
            </ul>


        </>
    );
}


export default Header;