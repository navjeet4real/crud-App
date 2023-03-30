import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
