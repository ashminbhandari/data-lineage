import "bootstrap/dist/css/bootstrap.min.css";
import SqlEditor from "./components/SQLEditor";
import React from "react";
import DatabaseCredentials from "./components/DatabaseCredentials";
import DBTableDropdown from "./components/DBTableDropdown";
import TableView from "./components/TableView";
import QueryMessage from "./components/QueryMessage";

function App() {
  return (
    <>
      <DatabaseCredentials/>
      <SqlEditor />
      <DBTableDropdown />
      <TableView />
      <QueryMessage />
    </>
  );
}

export default App;
