import "bootstrap/dist/css/bootstrap.min.css";
import SqlEditor from "./components/SQLEditor";
import React from "react";
import TableView from "./components/TableView";
import { useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);

  return (
    <>
      <SqlEditor setTableData ={setTableData} />
      <TableView tableData={tableData} />
    </>
  );
}

export default App;
