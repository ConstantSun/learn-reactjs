import { useState } from "react";

export default function TextExpander({ percentShowedWords = 100 , children}) {
  let temp =  children.split(" ")
  const noShowedWords = Math.round(temp.length*percentShowedWords/100);
  console.log("length: ", temp.length)

  const showedWords = temp.slice(0, noShowedWords).join(" ");
  const hiddenWords = temp.slice(noShowedWords, ).join(" ");
  const [isShowed, setIsShowed] = useState(false);
  return (
    <div>
      {showedWords}

      <Box isShowed={!isShowed}>
        ...
        <Button color={"red"} text={"Show more"} setIsShowed={setIsShowed} val={true} />
      </Box>

      <Box isShowed={isShowed}>
        {" "}
        {hiddenWords}
        <Button color={"green"} text={"Show less"} setIsShowed={setIsShowed} val={false} />
      </Box>
    </div>
  );
}
function Button({color, text, setIsShowed, val}){
  return (
    <button style={{ color: color }} onClick={() => setIsShowed(val)}>
      {text}
    </button>
  );
}

function Box({isShowed, children}){
  return (
    <>
      {isShowed &&  children}
    </>
  );
}