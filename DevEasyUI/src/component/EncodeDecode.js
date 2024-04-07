

function perform(type)
{
    let input=document.getElementById("encodeInput");
    let output=document.getElementById("encodeOutput");

        let text=input.value;

    if(type=="URLEncode")
    {
        printDataOnOutput(output,encodeURIComponent(text));
        
    }
    else if(type=="URLDecode")
    {
        printDataOnOutput(output,decodeURIComponent(text));
    }
    else if(type=="StringEncode")
    {
        printDataOnOutput(output,btoa(text));
    }
    else if(type=="StringDecode ")
    {
        printDataOnOutput(output,atob(text));
    }
    else if(type=="Copy")
    {
        let textToCopy= output.innerText; 
       let copiedDiv= document.getElementById("encodecopySpan");
       copiedDiv.style.display="inline";
       
       
       navigator.clipboard.writeText(textToCopy)
       .then(() => {
          
       })
       .catch((error) => {
           console.error('Error copying text: ', error);
       });

        setTimeout(()=>{
            copiedDiv.style.display="none";
        },5000)


    }
    else if(type=="MoveToInput")
    {
        input.value=output.innerText;
    }

}


function printDataOnOutput(output,text)
{
    output.innerText=text;
}


export default perform;