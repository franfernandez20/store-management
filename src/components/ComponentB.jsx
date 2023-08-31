import { useContextProvider } from "../hooks/useContextProvider";

function ComponentB() {
  const { count, incrementCount } = useContextProvider();
  return (
    <>
      <h1>Component B</h1>
      {count}
      <button onClick={incrementCount}>Increment</button>
    </>
  );
}

export default ComponentB;
