import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SqlEditor from "./components/SQLEditor";
import React from "react";
import DatabaseCredentials from "./components/DatabaseCredentials";

function App() {
  return (
    <div className="w-100">
      <DatabaseCredentials />
      <SqlEditor />
    </div>
  );
}

export default App;
