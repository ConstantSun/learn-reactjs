import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const skillList = [
    ["html+css", "red", "intermediate"],
    ["javascript", "yellow", "beginner"],
  ];
  return (
    <div className="card">
      <Avatar img_="https://png.pngtree.com/element_our/20190522/ourmid/pngtree-small-briquettes-cute-avatar-logo-material-image_1070815.jpg" />
      <div className="data">
        <Intro name="Jonas" brief="Full stack developer and teacher at udemy" />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList skillList={skillList} />
      </div>
    </div>
  );
}
function Avatar({ img_ }) {
  return <img src={img_} alt="avatar" />;
}
function Intro({ name, brief }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{brief}</p>
    </div>
  );
}

function SkillList({ skillList }) {
  console.log(skillList);
  return (
    <div className="skill-list">
      {skillList.map((skill) => (
        <p className="skill" style={{ backgroundColor: skill[1] }}>
          {skill[0]}
        </p>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
