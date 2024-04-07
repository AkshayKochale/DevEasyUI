
import JsonCom from "./JsonCom";
import ListPage from "./ListPage";
import Encoding  from "./Encoding";

function Main()
{

   

    return(
        <>
        

            <div className="main-container" id="main-container" >
                <JsonCom></JsonCom>
                <ListPage></ListPage>
                <Encoding></Encoding>
            </div>
        </>
    );

}

export default Main;