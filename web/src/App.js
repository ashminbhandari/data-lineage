import "bootstrap/dist/css/bootstrap.min.css";
import SqlEditor from "./components/SQLEditor";
import React from "react";
import TableView from "./components/TableView";
import { useState } from "react";
import Dracula from 'graphdracula';

function App() {
  const [tableData, setTableData] = useState([]);

  const genExecuteQuery = async (sqlQuery) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({sqlQuery})
  };
    await fetch('http://localhost:3001/api/lineage/executeQuery', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.err) {
          alert(data.err);
        } else if (data.query_result.length == 0) {
          alert("0 rows returned");
        } else if (data.query_result.length > 0){
          setTableData(data.query_result);
        }
      });
  }

  const handleVisualiseLineage = () => {
    genExecuteQuery('select * from LineageEventRaw limit 10');
    if (tableData.length > 0) {
    var g = new Dracula.Graph();
    for (let i = 0; i < tableData.length; i++) {
      g.addEdge(tableData[i].source_name, tableData[i].target_name);
    }
    var layout = new Dracula.Layout.Spring(g)
    var renderer = new Dracula.Renderer.Raphael('#paper', g, 1000, 400)
    renderer.draw()
    }
  };


  return (
    <>
      <SqlEditor setTableData ={setTableData} />
      <button
            className="btn btn-warning"
            onClick={() => handleVisualiseLineage()}
            style={{
              marginBottom: 20,
              marginRight: 40,
              float: "right"
            }}
          >
            Visualize lineage
       </button>
      <div id='paper'></div>
      <TableView tableData={tableData} />
    </>
  );
}

export default App;
