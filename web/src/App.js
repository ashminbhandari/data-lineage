import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SqlEditor from "./components/SQLEditor";
import React from "react";
import DatabaseCredentials from "./components/DatabaseCredentials";
import Bottom from "./components/Bottom";

function App() {
  return (
    <div>
      <DatabaseCredentials />
      <SqlEditor />
      <Bottom />
    </div>
  );
}

export default App;
