import axios from 'axios';

const HIDE_KEY="Jgk5Lp";
let MINISPAN_CUR=0;
let outputData=[];
let map=new Map();
let eventMap=new Map();

function initialize()
{
     MINISPAN_CUR=0;
     outputData=[];
     map=new Map();
     eventMap=new Map();

}
function perform(e,type)
{
    let inputArea= document.getElementById("json-area");
    let outputArea=document.getElementById("output-area");
    if(type=="validate")
    validate();
    else if(type=="beautify")    
        beautify();
    else if(type=="inputCopy" )
         copyInputTextToClipBoard(inputArea);
     else if(type=="outputCopy" )
         copyOutputDivTextToClipBoard();
      else if(type=="clear")  
        {
            inputArea.value="";
            initialize()
            printArrayOnDiv()
            displayNumber()
         }
       else if(type=="moveToInput")  
       {
        inputArea.value=getJsonFromOutputDiv();
       }
       else if(type=="copyAsString")
       {
            copyAsString();
       }
       else if(type=="stringToJson")
       {
            stringToJson();
       }
       else if(type=="toSingleLine")
       {
            toSingleLine();
       }
    
        return(
            <></>
        )

}


function toSingleLine()
{
    let json=JSON.parse(getJsonFromOutputDiv());
    outputData=[JSON.stringify(addColorToJson(json)).replace("}", '} ')]
    printArrayOnDiv(true);
    displayNumber();
    
}

function printInsingleLine()
{
    let outputArea=document.getElementById("output-area");
    outputArea.innerHTML="";

    let tempStr=outputData[0];

    let arr=tempStr.split("</span>");

    for(let i=0;i<arr.length;i++)
    {   
        // outputArea+=

    }
}


function stringToJson()
{
    
        let outputArea=document.getElementById("output-area");
    initialize();

    let area=document.getElementById("json-area");
    let rawData=area.value;
    let inputvalue=rawData
    // convertMultiLineToSingleLine(rawData);
    if(rawData==undefined || rawData.length<=1 || rawData==''
            || rawData.trim().charAt(0)=="{" || rawData.trim().charAt(0)=="[")
    {

            if(rawData.trim().charAt(0)=="{" || rawData.trim().charAt(0)=="[")
            {
                outputArea.innerHTML=`<span class='invalidJson'> Enter Valid String : Must start with ' or " </span>`
                +`<i class='fa-solid fa-face-sad-cry sadEmoji'></i>`;
                    outputData=[]
                    displayNumber()
                    return ;
            }

        outputArea.innerHTML=`<span class='invalidJson'> Enter Valid String : cannot be empty</span>`
                                +`<i class='fa-solid fa-face-sad-cry sadEmoji'></i>`;
        outputData=[]
        displayNumber()
        return ;
    }
    else
    {
            try
            {
                let parsedValue = JSON.parse(inputvalue+"");
                let afterColor=addColorToJson(JSON.parse(parsedValue+""));

                outputData=setOutputDataForFirstTime(JSON.stringify(afterColor,null,4).split("\n"));
                    
                printArrayOnDiv()

                displayNumber(true)
                
            }
            catch(e)
            {
                console.log(e);
                outputArea.innerHTML=`<span class='invalidJson'> `+enhanceErrorMessage(e,inputvalue)+`</span>`
                +`<i class='fa-solid fa-face-sad-cry sadEmoji'></i>`;
                displayNumber()
            }

    }
}

function validate(passedjsonStr)
{
    
   let outputArea=document.getElementById("output-area");
     initialize()
     console.log("validatecalled..")
    let rawData;

    let area=document.getElementById("json-area");

       if(passedjsonStr) 
        rawData=passedjsonStr;
    else
       rawData=area.value;

    let inputvalue=convertMultiLineToSingleLine(rawData);

    if(rawData==undefined || rawData.length<=1 || rawData==''
            || rawData.trim().charAt(0)=="\"" || (rawData.trim().charAt(0)=="\'"))
    {   
        if(rawData.trim().charAt("\"") || rawData.trim().charAt("\'"))
        {
            outputArea.innerHTML=`<span class='invalidJson'> Enter Valid JSON : Must start With '{' or '['</span>`
                                +`<i class='fa-solid fa-face-sad-cry sadEmoji'></i>`;
                outputData=[]
                 displayNumber()
            return ;
        }
        
        outputArea.innerHTML=`<span class='invalidJson'> Enter Valid JSON : cannot be empty</span>`
                                +`<i class='fa-solid fa-face-sad-cry sadEmoji'></i>`;
        outputData=[]
        displayNumber()
        return ;
    }
    else
    {
        try 
            {
                // console.log("before",inputvalue);
                let validatedJson=JSON.parse(inputvalue+"");
            let formatted= addColorToJson(validatedJson);
            //    console.log("after form",formatted);
            
            // //    outputArea.innerHTML= JSON.stringify(formatted);
                outputData=[JSON.stringify(formatted)];
                printArrayOnDiv();
                beautify(true);
            }
            catch(e)
            {
                outputArea.innerHTML=`<span class='invalidJson'> `+enhanceErrorMessage(e,inputvalue)+`</span>`
                +`<i class='fa-solid fa-face-sad-cry sadEmoji'></i>`;
                displayNumber()
            }
    }
    
    

}

function isNumber(char) {
    return !isNaN(parseFloat(char)) && isFinite(char);
}

function enhanceErrorMessage(e,invalidJson)
{
    let buildHint="</br>Hint : Check near '";
    try{

    let colNoStart=e.message.split("position")[1].trim();

        let colStr="";
        for(let i=0;i<colNoStart.length;i++)
           if(isNumber(colNoStart.charAt(i))) 
                colStr+=colNoStart.charAt(i)
            else break;
        

       colStr=parseInt(colStr);

       if(colStr-10>=0)colStr-=10;
        let totalSize=20;
       while(colStr<invalidJson.length && totalSize>=0)
        {

            if(invalidJson.charAt(colStr)!=' '){
                buildHint+=(invalidJson.charAt(colStr));
                   totalSize--; 
            }
            colStr++;
        }
        
        
    }catch(error){
        return e;
    }


    return e+buildHint+"'";
}

function beautify(afterValidate)
{
        
        if(afterValidate)
        {
           let rawData="";
        
            for(let i=0;i<outputData.length;i++)
            {
                if(!outputData.includes("..."))
                    rawData+=outputData[i].replaceAll(HIDE_KEY,"");
            }
        
            map=new Map();
            eventMap=new Map();
        
            let afterParse=JSON.parse(rawData);
            outputData=setOutputDataForFirstTime(JSON.stringify(addColorToJson(afterParse),null,4).split("\n"));
            printArrayOnDiv()
            displayNumber(true);
        }
        else
        {
            let afterParse=JSON.parse(getJsonFromOutputDiv());
            outputData=setOutputDataForFirstTime(JSON.stringify(addColorToJson(afterParse),null,4).split("\n"));
            printArrayOnDiv()
            displayNumber(true);

        }
    
   
    
}

function setOutputDataForFirstTime(jsonData)
{
        let temp=[];
        let c=0;
        for(let i=0;i<jsonData.length;i++)
        {
            if(jsonData[i].includes("[") || jsonData[i].includes("{"))
            {
               let lastIndex= findClosingBrackets(i,jsonData);
               temp[c]=HIDE_KEY+createSpanForDivWithBrackets(jsonData[i],i,lastIndex);
                c++;
            }
          
                temp[c]=jsonData[i];

             c++;   
        }

        return temp;

}


function displayNumber(flag)
{
  
    let numerDiv=document.getElementById("main-numeric");
    let jsonDiv = document.getElementById("output-area");

    while(numerDiv.firstChild)
        {
            while(numerDiv.firstChild.firstChild) numerDiv.firstChild.removeChild(numerDiv.firstChild.firstChild);
            numerDiv.removeChild(numerDiv.firstChild);
        }
        numerDiv.innerHTML="";
       let lines=outputData.length; 

       let temp=[];
       // show minimize option
       if(flag)
       {
         temp=outputData;
        }
       
       let counter=1; 
    for(let i=1;i<lines+1;i++)
    {
        if(temp[i-1]!=undefined && temp[i-1].includes(HIDE_KEY))continue;
        let childNumber=document.createElement("span");
        childNumber.classList.add("child-numeric");
        childNumber.setAttribute("id",i);
        childNumber.setAttribute("value",i);
        childNumber.innerText=counter+"";

            if( temp[i-1]!=undefined && !temp[i-1].includes("...") &&(temp[i-1].includes("[") || temp[i-1].includes("{")))
                {
                    
                    var iconElement = document.createElement("i");
                    iconElement.setAttribute("id",i);
                    // iconElement.setAttribute("val","expand");
                    iconElement.classList.add("fa-solid", "fa-angle-down", "arrow-icon");
                    iconElement.addEventListener('click',(e)=>collapse(e));
                    childNumber.appendChild(iconElement) ;
                }

        numerDiv.appendChild(childNumber);
        counter++;
    }

   
    jsonDiv.addEventListener('scroll', () => {
    // console.log("Numer div scrolled");
    // console.log("JSON div:", jsonDiv);

    var scrollPercentage = jsonDiv.scrollTop / (jsonDiv.scrollHeight - jsonDiv.clientHeight);
    // console.log("Scroll percentage:", scrollPercentage);

    numerDiv.scrollTop = scrollPercentage * (numerDiv.scrollHeight - numerDiv.clientHeight);
    // console.log("JSON div scrolled to:", jsonDiv.scrollTop);
});
}

// function convertMultiLineToSingleLine(input) {
//     if (input === undefined) return;
    
//     // Remove leading and trailing whitespace
//     input = input.trim();
    
//     // Replace newline characters with empty string
//     input = input.replace(/\n/g, "");
//     let skip=[];
//     let output = "";
//     for (let i = 0; i < input.length; i++) {
//         let char = input.charAt(i);

//         // Skip whitespace after opening brackets
//         if (char === "[" || char === "{" || char === "(" || char ===",") {
//             let j = i + 1;
//             while (j < input.length && input.charAt(j) === ' ' || input.charAt(j) === String.fromCharCode(160)) {
//                 j++;
//             }
//             console.log("Character code after opening bracket:", input.charAt(j).charCodeAt(0));
//             i = j - 1; 
//         }

//         output += char;
//     }

//     return output;
// }


function convertMultiLineToSingleLine(input) {
    if (input === undefined) return;
    
    // Remove leading and trailing whitespace
    input = input.trim();
    
    // Replace newline characters with empty string
    input = input.replace(/\n/g, "");
    let skip = [];
    let output = "";
    for (let i = 0; i < input.length; i++) {
        let char = input.charAt(i);

        // Skip whitespace after opening brackets
        if (char === "[" || char === "{" || char === "(" || char === ",") {
            let j = i + 1;
            while (j < input.length && (input.charAt(j) === ' ' || input.charAt(j) === String.fromCharCode(160))) {
                j++;
            }
            i = j - 1; 
        }
        // Remove spaces before closing brackets, commas, and parentheses
        else if (char === "]" || char === "}" || char === ")" || char === ",") {
            while (output.endsWith(" ") || output.endsWith(String.fromCharCode(160))) {
                output = output.slice(0, -1);
            }
        }

        output += char;
    }

    return output;
}


// let historyMap=new Map();

function collapse(e ) 
{

    getModifiedAfterCollapse(e)

}


export function expand(spanId,startIndex,endIndex)
{
    console.log("asked for expand",startIndex,endIndex);
    outputData[startIndex-1]=HIDE_KEY+outputData[startIndex-1];

        for(let i=startIndex ;i<=endIndex;i++)
            
            if(!outputData[i].includes("..."))
            outputData[i]=outputData[i].replaceAll(HIDE_KEY,"");


            console.log(outputData);
     printArrayOnDiv();
     displayNumber(true);
     map.delete(spanId);
     setBackPositionInMinSpan();
}


function getModifiedAfterCollapse(element)
{

    addMinimizeSpanAtIndex(element);
            
}

function findClosingBrackets(ind,arr)
{
    let c='';

        // skip charatcers on consider '[' and '{'
    for(let i=0;i<arr[ind].length;i++)
        if(arr[ind].charAt(i)=='[' || arr[ind].charAt(i)=='{')
            c=arr[ind].charAt(i);

            //push current char in stack    
        let stack=[];
        ind++;

         while(ind<arr.length || stack.length!=0)
            {
                let curStr=arr[ind];

                if(!curStr.includes(HIDE_KEY))
                for(let i=0;i<curStr.length;i++)
                     if(curStr.charAt(i)=='[' || curStr.charAt(i)=='{')
                        stack.push(curStr.charAt(i));
                     else if(curStr.charAt(i)==']' || curStr.charAt(i)=='}')
                        if(stack.length==0) return ind+1;
                        else  if(curStr.charAt(i)=='}' && stack[stack.length-1]=="{")
                            stack.pop();
                        else  if(curStr.charAt(i)==']' && stack[stack.length-1]=="[")
                            stack.pop();

                  ind++;          
            }

           return -1; 
}


function addColorToJson(inputJson)
{
   if(inputJson==undefined)return;
    
   let type=checkIfObjectOrArray(inputJson);
    
   if(type=='Array')
   {
        let arr=[];
        for(let i=0;i<inputJson.length;i++)
        {
            arr.push(addColorToJson(inputJson[i]));
        }
        if(arr==[])return inputJson;
        
        return arr;
   }
   else if(type=='Object')
   {
        let str={};

    Object.keys(inputJson).forEach(key => {
        let newKey= `<span class='keyClass'>`+key+`</span>`;
        str[newKey]=addColorToJson(inputJson[key]);
    });

       
        return str;
   }
   else
    return inputJson;

   
}

function checkIfObjectOrArray(input){
    
    let i=0;
        let char=JSON.stringify(input).charAt(i);

        // while(char=="\"")char=JSON.stringify(input).charAt(i++)

        if(char=='[')return 'Array';
        else if(char=="{") return 'Object';
}


function printArrayOnDiv(isSingle) {
  let outputDiv = document.getElementById("output-area");
  outputDiv.innerHTML = "";
  let temp = outputData;
  let tagName="pre"  
  if(isSingle)tagName="span"

  for (let i = 0; i < temp.length; i++) {
    if(!temp[i].includes(HIDE_KEY))
         outputDiv.innerHTML += `<span class='div-span'> <`+tagName+` class='innerTag'>` + temp[i] + `</`+tagName+`></span>`;
  }
}

function createSpanForDivWithBrackets(data,startIndex,endIndex)
{
    let parts =[];

        if(data.includes("{"))
        {
        parts= data.split('{');
            for (let i = 1; i < parts.length; i++)
            parts[i] = `\"<span class='minimized-span' id=${MINISPAN_CUR} rowStart=${startIndex} rowEnd=${endIndex}>{...}</span>${parts[i]}\"`;
        }
        else
        {
            parts = data.split('[');
            for (let i = 1; i < parts.length; i++)
            parts[i] =`\"<span class='minimized-span' id=${MINISPAN_CUR} rowStart=${startIndex} rowEnd=${endIndex}>[...]</span>${parts[i]}\"`;
           
        }

        MINISPAN_CUR+=1;

    return parts.join("");
}



function getCurrentIndex(event)
{
    return parseInt(event.target.getAttribute("id"));
} 

function  addMinimizeSpanAtIndex(event)
{
    // let outputDiv=document.getElementById("output-area");
    // let split =outputData;

    let index=getCurrentIndex(event);

    let lastIndex=findClosingBrackets(index-1,outputData)-1;
    console.log(index-1,lastIndex);
    outputData[index-2]=outputData[index-2].replaceAll(HIDE_KEY,"");

    for(let i=index-1;i<=lastIndex;i++)
        outputData[i]=HIDE_KEY+outputData[i];

        printArrayOnDiv();
        displayNumber(true,null);
        setBackPositionInMinSpan(index-1,lastIndex);

}


function setBackPositionInMinSpan(index,lastIndex)
{
    // add click option on minimized span
    let listOfMinimize=document.getElementsByClassName("minimized-span");
    for(let i=0;i<listOfMinimize.length;i++)
    {
            let span=listOfMinimize[i];
            let spanId=span.getAttribute("id");
            let startEnd=eventMap.get(spanId);

            if(startEnd==undefined)startEnd=[index,lastIndex];

                
             span.addEventListener('click',()=>{
                    expand(spanId,startEnd[0],startEnd[1]);
                })

                eventMap.set(spanId ,startEnd);
            
                
    }


}

function copyInputTextToClipBoard(inputDiv)
{
    var text = inputDiv.innerText || inputDiv.textContent || inputDiv.value;

    navigator.clipboard.writeText(text)
        .then(() => {
            // alert('Text copied to clipboard: ' + text);
            showHideCopied("copied-input");

        })
        .catch((error) => {
            console.error('Error copying text: ', error);
        });

}

function copyOutputDivTextToClipBoard()
{
        let text=getJsonFromOutputDiv();

            navigator.clipboard.writeText(text)
            .then(() => {
                // alert('Text copied to clipboard: ' + text);
                showHideCopied("copied-output");
    
            })
            .catch((error) => {
                console.error('Error copying text: ', error);
            }); 

            
}

function getJsonFromOutputDiv()
{
    let tempStr=[];
    let pos=0;

    let copyOutput=outputData
    let text="";
    if(outputData.length<=1)
    {
        text=document.getElementById("output-area").innerText;
    }
    else  
    {
        for(let i=0;i<copyOutput.length;i++)
           if(!copyOutput[i].includes("...")) 
           tempStr[pos++]=(copyOutput[i].replaceAll("<span class='keyClass'>","")
            .replaceAll("</span>","").replaceAll(HIDE_KEY,""));
        
        text=JSON.stringify(JSON.parse(convertMultiLineToSingleLine(tempStr.join(""))),null,4);
    }
    return text;
}

function copyAsString()
{
    let validJson=getJsonFromOutputDiv();
    let text=JSON.stringify(convertMultiLineToSingleLine(validJson));
    navigator.clipboard.writeText(text)
    .then(() => {
        // alert('Text copied to clipboard: ' + text);
        showHideCopied("copied-output");

    })
    .catch((error) => {
        console.error('Error copying text: ', error);
    });

}

function showHideCopied(type)
{
    let copiedSpan=document.getElementById(type);
    copiedSpan.style.display="inline";

    setTimeout(()=>{
        copiedSpan.style.display="none";
    },5000)
}

export default perform;


// json to string 
// string to json 
//force to json 
