import { useState } from "react";
import "./index.css";

// Parent Component
export default function ParentComponent() {
  const [person, setPerson] = useState({ name: "John", age: 30 });

  return <ChildComponent person={person} />;
}

// Child Component
function ChildComponent({ person }) {
  // This will not update the person object in the parent component
  person.age = 35;

  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
    </div>
  );
}

