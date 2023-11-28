import "bootstrap/dist/css/bootstrap.min.css";
import SqlEditor from "./components/SQLEditor";
import React from "react";
import TableView from "./components/TableView";

function App() {
  return (
    <>
      <SqlEditor />
      <TableView />
    </>
  );
}

export default App;
