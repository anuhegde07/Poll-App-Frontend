import React from "react";

import { useContext } from "react";
import { UserContext } from "./Parent";

function Child(){
    const user=useContext(UserContext)
    return(
        <div className="box">
            <h1>chid Component</h1>
            <h3>{`BYe ${user}`} </h3>
            <UserContext.Consumer>
                {user => <h3>{`Be ${user}`} </h3>}
            </UserContext.Consumer>
        </div>
    )
}
 export default Child;