import {displayOnModal} from "./Modal"
import performOperation from "./ListOperation";



function ListPage()
{

    function displayModal()
    {
        let info=`
        <div class='main-info'>If one of the list is empty operations will happen
            only on single List *
        </div>
            <i class='fa-solid fa-xmark'id ='closeMark'></i>
        <div id="operationInfo">
        <div class="operation-info" id="countInfo">
            <h3>Count Operation</h3>
            <p>This operation counts the number of elements in the list.</p>
        </div>
        <div class="operation-info" id="unionInfo">
            <h3>Union Operation</h3>
            <p>This operation finds the union of two lists, removing any duplicate elements.</p>
        </div>
        <div class="operation-info" id="intersectionInfo">
        <h3>Intersection Operation</h3>
        <p>This operation finds the intersection of two lists, returning elements that are common to both lists.</p>
    </div>
    
    <div class="operation-info" id="distinctInfo">
        <h3>Distinct Operation</h3>
        <p>This operation removes duplicate elements from the list, keeping only unique elements.</p>
    </div>
    
    <div class="operation-info" id="tostringInfo">
        <h3>ToString Operation</h3>
        <p>This operation converts the list into a string representation.</p>
    </div>
    
    <div class="operation-info" id="toeachstringInfo">
        <h3>ToEachString Operation</h3>
        <p>This operation converts each element of the list into a string and returns a list of strings.</p>
    </div>
    
    <div class="operation-info" id="sortInfo">
        <h3>Sort Operation</h3>
        <p>This operation sorts the elements of the list in ascending order.</p>
    </div>
    
    <div class="operation-info" id="reverseInfo">
        <h3>Reverse Operation</h3>
        <p>This operation reverses the order of elements in the list.</p>
    </div>
    
    </div>
    `


        displayOnModal(info); 
    }

    function performOperationHelper(type)
    {
        performOperation(type);
    }
    
    


    return(
        <>
            <div className="listMainpage" id="listMainpage">
               
                        <textarea className="list-textArea list1TextArea" placeholder="list1" id="list1"/>
                        <textarea className="list-textArea list2TextArea" placeholder="list2" id="list2"/>
                        
                        <div className="list3TextArea"> 
                                <div className="listOutputTitle">
                                    <div className="opsTitle" id="opsTitle">Operation 
                                    </div>  <i className="fa-solid fa-info" title="How To Use" onClick={displayModal}></i>
                                        {/* <div className="opsDesc">description will be here Lorem ipsum dolor sit.</div> */}
                                </div>

                          <div className="listtool-btn"> 
                                <button onClick={()=>performOperationHelper("MoveToList1")} >MoveToList1</button>
                                <button onClick={()=>performOperationHelper("ToMultiLine")} >ToMultiLine</button>
                                <button onClick={()=>performOperationHelper("ToSingleLine")} >ToSingleLine</button>
                                <button className="listCopyStyle" id="listCopy" onClick={()=>performOperationHelper("Copy")} >Copy</button>
                                <button onClick={()=>performOperationHelper("clear")} >ClearAll</button>
                          </div>      

                            <div className="result" id="result"></div>
                        </div>

                         <div className="list-Operation" >
                                 <button className="list-btn count" id="count" onClick={()=>performOperationHelper("Count")} >Count</button>
                                 <button className="list-btn union" id="union" onClick={()=>performOperationHelper("Union")} >Union</button>
                                 <button className="list-btn intersection" id="intersection" onClick={()=>performOperationHelper("Intersection")} >Intersection</button>
                                 <button className="list-btn ditinct" id="ditinct" onClick={()=>performOperationHelper("Distinct")} >Distinct</button>
                                 <button className="list-btn tostring" id="tostring" onClick={()=>performOperationHelper("ToString")} >ToString</button>
                                 <button className="list-btn toeachstring" id="toeachstring" onClick={()=>performOperationHelper("ToEachString")} >ToEachString</button>
                                 <button className="list-btn sort" id="sort" onClick={()=>performOperationHelper("Sort")} >Sort</button>
                                 <button className="list-btn sort" id="reverse" onClick={()=>performOperationHelper("Reverse")} >Reverse</button>
                         </div>  
            </div>
           
        </>
        )

}


export default ListPage;