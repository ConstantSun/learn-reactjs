import { useState } from "react";
const Math = require("mathjs");
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <div className="buttons">
        <button
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          X
        </button>
      </div>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step} : {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={() => setStep((step) => Math.max(1, step - 1))}
            >
              Previous <span> {"<-"} </span>
            </Button>

            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={() => setStep((step) => Math.min(3, step + 1))}
            >
              Next <span> :D </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
