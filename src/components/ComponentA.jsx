import { useState } from "react";
import { useContextProvider } from "../hooks/useContextProvider";

function ComponentA() {
  const [myview, setMyView] = useState("");
  const { count, views, addView, countGlobal, incrementCount } =
    useContextProvider();

  const handleAddView = async () => {
    const res = await fetch("http://localhost:3100/views", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ view: myview }),
    });
    const data = await res.json();

    console.log(data);
    addView(data);
    setMyView("");
  };

  return (
    <>
      <h1>Component A</h1>
      <div>
        {count}
        <button onClick={incrementCount}>Increment</button>
      </div>
      <div>
        <h2>Views: </h2>
        <ul>
          {views.map((view) => (
            <li key={view}>{view}</li>
          ))}
        </ul>
      </div>

      <div>
        <input
          type="text"
          value={myview}
          onChange={(e) => setMyView(e.target.value)}
        />
        <button onClick={handleAddView}>Add</button>
      </div>
    </>
  );
}

export default ComponentA;
