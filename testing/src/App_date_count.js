import "./App.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(0)
  const [count,setCount] = useState(0)
  const [d, setDate] = useState(new Date());
  const [value, setValue] = useState(0)

  const handleCountChange = (increment) => {
     const newCount = count + increment * step;
     const newDate = new Date();
     newDate.setDate(newDate.getDate() + newCount);
     setCount(()=> newCount);
     setDate(()=> newDate);
      // setCount(newCount);
      // setDate(newDate);
   };

  return (
    <div>
      <div>
        {/* <button onClick={() => setStep(() => step - 1)}> - </button>
        Step: {step}
        <button onClick={() => setStep(() => step + 1)}> + </button> */}

        <input
          type="range"
          min="0"
          max="10"
          onChange={(e) => {
            setValue(e.target.value);
            setStep(e.target.value);
          }}
          value={value}
        /> {value}
      </div>

      <div>
        <button onClick={() => handleCountChange(-1)}>-</button>
        Count: {count}
        <button onClick={() => handleCountChange(1)}>+</button>
      </div>

      <div>
        {count >= 0 ? <> {count} days from </> : <>{-count} days ago since </>}
        today is:
        {d.toISOString()}
      </div>
      <button onClick={()=> {
        setDate(()=> new Date());
        setCount(()=> 0);
        setStep(()=>0);
        setValue(()=>0);
        }}>Reset</button>
    </div>
  );

}
export default App;
