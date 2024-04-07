
// popup description and report issue
function Modal()
{

       
   return(
        <>
            <div className="modalMainDiv" id="modalMainDiv">

            </div>
        </>
   )

}

 export function displayOnModal(data)
{
    let modal= document.getElementById("modalMainDiv");
    modal.innerHTML="";

    // process if needed
    modal.innerHTML=data;
    modal.style.display="inline";


     let closeMark=document.getElementById("closeMark");
     closeMark.addEventListener('click',()=>closeModal());
    
    
}

export function closeModal()
{
    let modal= document.getElementById("modalMainDiv");
    modal.style.display="none";
}


export default Modal;