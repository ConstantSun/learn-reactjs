import { useState } from "react";
import "./index.css";

let qnaList = [
  { id: 1, question: "What language is react based on?", answer: "JS" },
  {
    id: 2,
    question: "How to pass data from parent to child components ? ",
    answer: "Props",
  },
  { id:3,
    question: "How to give component memory ?", answer: "state" },
];
function App() {
  const [selected, setSelected] = useState(null)
  return (
    <div>
      <ul>
        {/* {qnaList.map( (qna) => (
          {selected == qna.id ? (<Item content={qna.answer} id={qna.id} setSelected={setSelected}/>) : (
            <Item content={qna.question} id={qna.id} setSelected={setSelected} /> ) } ) ) } */}
        {qnaList.map((qna) => (
          <>
            {selected === qna.id ? (
              <Item
                content={qna.answer}
                id={qna.id}
                setSelected={setSelected}
              />
            ) : (
              <Item
                content={qna.question}
                id={qna.id}
                setSelected={setSelected}
              />
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
function Item({ content, id, setSelected  }) {
  return (
    <div
      className="button"
      style={{ backgroundColor: "#fff", color: "#000" }}
      onClick={() => {
        setSelected(id);
      }}
    >
      <div> {content} </div>
    </div>
  );
}

export default App;
