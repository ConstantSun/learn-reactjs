import { useState } from "react";
let count = 0;
export function Counter(){
    const [_, reRender] = useState();
    return (
      <div>
        Count: {count} ###
        <button onClick={()=>{
            count++;
            reRender(Math.random())
        }}>Add</button>
      </div>
    );
}