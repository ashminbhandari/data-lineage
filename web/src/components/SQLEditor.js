// src/components/SqlEditor.js
import React, { useState } from "react";
import AceEditor from "react-ace";
import "brace/mode/sql";
import "brace/theme/monokai";
import "bootstrap/dist/css/bootstrap.min.css";

const SqlEditor = () => {
  const [sqlQuery, setSqlQuery] = useState("");

  const handleExecuteClick = () => {
    // Implement logic to send the SQL query to the server here
    // You can use a fetch request or a library like Axios to send the query.
  };

  return (
    <div className="d-flex">
      {/* SQL Editor */}
      <div className="flex-grow-1 p-4">
        {/* SQL Editor (Chat Box) */}
        <div
          className="rounded p-3"
          style={{
            border: "1px solid transparent", // Remove the border
            minHeight: "300px",
            maxHeight: "500px",
            overflow: "hidden", // Hide the overflow
            position: "relative", // Position relative for absolute button
          }}
        >
          {/* SQL Editor content */}
          <AceEditor
            mode="sql"
            theme="monokai"
            value={sqlQuery}
            onChange={(newValue) => setSqlQuery(newValue)}
            name="sql-editor"
            editorProps={{ $blockScrolling: Infinity }} // Disable scroll
            width="100%"
          />
          {/* Execute Query Button (positioned at the right bottom) */}
          <button
            className="btn btn-primary"
            onClick={handleExecuteClick}
            style={{
              position: "absolute",
              bottom: 10,
              right: 25,
            }}
            disabled
          >
            Execute Query
          </button>
        </div>
      </div>
    </div>
  );
};

export default SqlEditor;
