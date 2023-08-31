import { useState } from "react";
import "../App.css";
import { useGlobalContextProvider } from "../hooks/useGlobalContextProvider";
import { useContextProvider } from "../hooks/useContextProvider";

function ComponentA() {
  return <ComponentAContent />;
}

function ComponentAContent() {
  const [myList, setMyList] = useState("");
  const { user } = useGlobalContextProvider();
  console.log("user in child: ", user);
  const state = useContextProvider();
  console.log("state", state);
  const { count, list, name, setName, addList, incrementCount } = state;

  const handleSave = async () => {
    const res = await fetch("http://localhost:3100/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user?.id, ...state }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className="card">
        <h2>Component A</h2>
        <div className="vstack">
          {count}
          <button onClick={incrementCount}>Increment</button>
        </div>
      </div>
      <div className="card">
        <div className="vstack">
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="card">
        <div className="vstack">
          <h2>Views: </h2>
          <ul>
            {list?.map((view) => (
              <li key={view}>{view}</li>
            ))}
          </ul>
        </div>
        <div className="vstack">
          <input
            type="text"
            value={myList}
            onChange={(e) => setMyList(e.target.value)}
          />
          <button
            onClick={() => {
              addList(myList);
              setMyList("");
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  );
}

export default ComponentA;
