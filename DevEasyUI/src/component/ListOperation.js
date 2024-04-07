
function performOperation(type)
{
   let list1= document.getElementById("list1");
   let list2= document.getElementById("list2");
   let result= document.getElementById("result");


    if(type=="MoveToList1")
    {
            moveToList(list1,list2,result)
    }
    else if(type=="clear")
    {
        clearResult(result);
    }
    else if(type=="ToMultiLine")
    {
        toMultiline(list1,list2,result);
    }
    else if(type=="ToSingleLine")
    {
        toSingelLine(list1,list2,result);
    }
    else if(type=="Copy")
    {
        copy(list1,list2,result)
    }
    else if(type=="Count")
    {
            setTitle(type);
            count(list1,list2,result);
    }
    else if(type=="Union")
    {
        setTitle(type);
        union(list1,list2,result)
    }
    else if(type=="Intersection")
    {
        setTitle(type);
        intersection(list1,list2,result);
    }
    else if(type=="Distinct")
    {
        setTitle(type);
        distinct(list1,list2,result);
    }
    else if(type=="ToString")
    {
        setTitle(type);
        toString(list1,list2,result);
    }
    else if(type=="ToEachString")
    {
        setTitle(type);
        toEachString(list1,list2,result)
    }
    else if(type=="Sort")
    {
        setTitle(type);
        sort(list1,list2,result)
    }
    else if(type=="Reverse")
    {
        setTitle(type);
        reverse(list1,list2,result);
    }


}

function setTitle(title)
{
    let titleDiv=document.getElementById("opsTitle");
    titleDiv.innerHTML=title;
}

function clearResult(result)
{
    result.innerHTML="";
}

function printDataOnResult(result,data)
{
    clearResult(result);
    result.innerHTML=data;
}

    // result div and array is passed
function printOnMultiline(result,data,option)
{   
    clearResult(result);
    for(let i=0;i<data.length;i++)
        if(option!=undefined && i!=data.length-1)
            result.innerHTML+="<br>"+data[i]+option;
        else
        result.innerHTML+="<br>"+data[i];

}

function getArrayFromDiv(list)
{
    let arr=[];
     let val=list.value;
     if(val!=undefined && val!=' ' && val.trim().length>1)
    {
        if(val.includes(","))
            arr=val.split(",");
        else if(val.includes("\n"))
            arr=val.split("\n");
        else
            arr=val.split(" ");
    }

      if(arr.length==0)
      {

      }
    return arr;

}

function filterData(l1)
{   
       let arr=[]; 

    for(let i=0;i<l1.length;i++)
        if(l1[i]!=undefined && l1[i]!=" " && l1[i]!="")
            arr.push(l1[i].replaceAll("\"",""));

    return arr;
}

function moveToList(list1,list2,result)
{
    list1.value="";
    list2.value="";
    list1.value=result.innerText;
}

function copy(list1,list2,result)
{
    let text= result.innerText; 

    navigator.clipboard.writeText(text)
    .then(() => {
        modifyCopyButton()

    })
    .catch((error) => {
        console.error('Error copying text: ', error);
    });
}

function modifyCopyButton()
{
    let copyBtn=document.getElementById("listCopy");
    copyBtn.innerText="Copied!!!"
    copyBtn.style.backgroundColor="green"
    copyBtn.style.color="#fff"

    setTimeout(() => {
        copyBtn.innerText="Copy"
        copyBtn.classList.remove("listCopyStyle");
        copyBtn.style.backgroundColor="#fff"
        copyBtn.style.color="#1d1e22"
    }, 5000);
}


function count(list1,list2,result)
{
    let l1=filterData(getArrayFromDiv(list1));
    let l2=filterData(getArrayFromDiv(list2));
    
    let count=l1.length+l2.length;
    
    let output=`<span class='singleLineOutput'> Total count of Element is : <span class='answer'>`+count+`</span></span>`
    printDataOnResult(result,output);

}

function union(list1,list2,result)
{
    let l1=filterData(getArrayFromDiv(list1));
    let l2=filterData(getArrayFromDiv(list2));

    l1.concat(l2);
    printOnMultiline(result,[...l1,...l2]);
}

function intersection(list1,list2,result)
{
    
    let l1=filterData(getArrayFromDiv(list1));
    let l2=filterData(getArrayFromDiv(list2));

    let intersectionArray = [];

    for (let i = 0; i < l1.length; i++) 
    {
         if (l2.includes(l1[i])) 
            intersectionArray.push(l1[i]);
        
    }
    printOnMultiline(result,intersectionArray);

}

function distinct(list1, list2, result) {
    let l1 = filterData(getArrayFromDiv(list1));
    let l2 = filterData(getArrayFromDiv(list2));

    let distinctArray = [];

    for (let i = 0; i < l1.length; i++) {
        if (!l2.includes(l1[i]) && !distinctArray.includes(l1[i])) {
            distinctArray.push(l1[i]);
        }
    }

    for (let j = 0; j < l2.length; j++) {
        if (!l1.includes(l2[j]) && !distinctArray.includes(l2[j])) {
            distinctArray.push(l2[j]);
        }
    }

    printOnMultiline(result,distinctArray);
}


function toString(list1,list2,result)
{
    let l1=filterData(getArrayFromDiv(list1));
    let l2=filterData(getArrayFromDiv(list2));

    l1.concat(l2);
    let unionArr=[...l1,...l2];
    printDataOnResult(result,"\""+unionArr+"\"");
}


function toEachString(list1,list2,result)
{
    let l1=filterData(getArrayFromDiv(list1));
    let l2=filterData(getArrayFromDiv(list2));

    l1.concat(l2);
    let unionArr=[...l1,...l2];
    let resultArr=[];

    for(let i=0;i<unionArr.length;i++)
    {
        if(i==unionArr.length-1)
        resultArr+="\""+unionArr[i]+"\"";
        else
            resultArr+="\""+unionArr[i]+"\", ";
    }
    printDataOnResult(result,resultArr); 

}

function sort(list1,list2,result)
{
    let l1=filterData(getArrayFromDiv(list1));
    let l2=filterData(getArrayFromDiv(list2));

    let afterSorted=[];
    let unionArr=[...l1,...l2];

        if(checkIfAllMixed(unionArr))
        {
            let str= `<span class='errormsg'> All elements should be of <span class='answer'>same</span> data type to use Sort </span>`;
            printDataOnResult(result,str );  
            return;
        }
        else
        {   
            if(isNumber(unionArr[0]))
            {
                let temp=[];
                for (let i = 0; i < unionArr.length; i++) 
                    temp[i]=parseInt(unionArr[i].replaceAll(" ",""));

                afterSorted=customSort(temp);       
            }
            else
            {
                afterSorted=unionArr.sort();
            }
        }
    printOnMultiline(result,afterSorted);
}

function isNumber(str) {
    return !isNaN(str);
}

function checkIfAllMixed(l1)
{
     let flag=isNumber(l1[0]);
    
    for (let i = 0; i < l1.length; i++) 
    {
        let cur=isNumber(l1[i]);

        if(flag && !cur)return true;
        if(!flag && cur)return true;   
    }

    return false;
}

function customSort(arr)
{
    // let res=[];

    for(let i=0;i<arr.length;i++)
    {
        for(let j=i+1;j<arr.length;j++)
            if(arr[i]>arr[j])
            {
                let t=arr[i];
                arr[i]=arr[j];
                arr[j]=t;
            }
    }

       return arr; 
}

function  reverse(list1,list2,result)
{
    let l1=filterData(getArrayFromDiv(list1));
    let l2=filterData(getArrayFromDiv(list2));
    let unionArr=[...l1,...l2];
    unionArr.reverse(); 

    printOnMultiline(result,unionArr);

}


    function toMultiline(list1,list2,result)
    {
            let data=result.innerText;

            let split=data.split("\n");
            
            if(split.length>1)return ;

           let arr=[];
           let option="";

            if(data.includes(","))
            { arr=data.split(","); option=","}
             else if(data.includes("\n"))
            {arr=data.split("\n"); option="\n"}
            else
            {arr=data.split(" "); option=" "}
            
            printOnMultiline(result,arr,option)
    }

    function toSingelLine(list1,list2,result)
    {
        let data=result.innerText;

        let split=data.split("\n");

            

        printDataOnResult(result,split.join(" "))
    }

export default performOperation;