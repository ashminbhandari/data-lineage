import React from "react";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';

const TableView = (props) => {

   // Check if props.tableData is defined and not empty
  if (!props.tableData || props.tableData.length === 0) {
    return <></>;
  }
  // Extracting column names from the first object in the array
  const columns = Object.keys(props.tableData[0]);

  console.log(columns);

  return props.tableData ? (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          {/* Creating table headers */}
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Creating table rows */}
        {props.tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ): <></>;
};



export default TableView;
