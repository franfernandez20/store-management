import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Link, Route } from "wouter";
import ComponentA from "./components/ComponentA";
import ComponentB from "./components/ComponentB";
import { Provider } from "./hooks/Provider";
import { useContextProvider } from "./hooks/useContextProvider";

function App() {
  return (
    <Provider>
      <Main />
      <Route path="/a" component={ComponentA} />
      <Route path="/b">
        <ComponentB />
      </Route>
    </Provider>
  );
}

export default App;

const Main = () => {
  const { countGlobal, setCount } = useContextProvider();
  return (
    <>
      <div>
        <a>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Global count is: {countGlobal}</h2>
      <div className="card">
        <button onClick={() => setCount(0)}>Reset local count</button>
      </div>
      <div>
        <Link href="/a">
          <a className="link">Page A</a>
        </Link>
      </div>
      <div>
        <Link href="/b">
          <a className="link">Page B</a>
        </Link>
      </div>
    </>
  );
};
