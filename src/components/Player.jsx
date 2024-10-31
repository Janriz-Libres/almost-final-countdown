import { useRef, useState } from "react";

export default function Player() {
  const [name, setName] = useState("");
  const inputRef = useRef();

  function handleChange(event) {
    if (event.type == "keydown" && event.key !== "Enter") {
      return;
    }

    setName(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {name || "unknown entity"}</h2>
      <p>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a name"
          onKeyDown={handleChange}
        />
        <button onClick={handleChange}>Set Name</button>
      </p>
    </section>
  );
}
