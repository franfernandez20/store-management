import { Suspense, useState } from "react";
import "./App.css";

import { Link, Route } from "wouter";
import ComponentA from "./components/ComponentA";
import ComponentB from "./components/ComponentB";
import { useGlobalContextProvider } from "./hooks/useGlobalContextProvider";
import { Provider } from "jotai";

function App() {
  return (
    <Provider>
      <Main />
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/a">
          <ComponentA />
        </Route>
        <Route path="/b">
          <Provider>
            <ComponentB />
          </Provider>
        </Route>
      </Suspense>
    </Provider>
  );
}

export default App;

const Main = () => {
  const { user, setUser } = useGlobalContextProvider();
  console.log("user MAIN: ", user);
  const [newId, setNewId] = useState(0);
  return (
    <>
      <div className="card">
        <div className="vstack">
          <h3>User id: {user.id}</h3>
        </div>
        <div className="vstack">
          <input
            type="number"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
          />
          <button
            onClick={() =>
              setUser({
                name: "user-" + newId,
                id: newId,
                function: () => {
                  console.log("user function RUN");
                },
              })
            }
          >
            Change
          </button>
        </div>
      </div>

      <hr></hr>
      <div className="vstack">
        <Link href="/a">
          <a className="link">Page A</a>
        </Link>
        <Link href="/b">
          <a className="link">Page B</a>
        </Link>
      </div>
      <hr></hr>
    </>
  );
};
