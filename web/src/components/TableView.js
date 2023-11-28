import React from "react";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';

const TableView = () => {
  const COLUMN_NAMES = ["first name", "last name", "User name"];
  const TABLE_DATA = [
    {
      firstName: "Mark",
      lastName: "Shafa",
      userName: "Balikis",
    },
    {
      firstName: "Mark",
      lastName: "Shafa",
      userName: "Balikis",
    },
    {
      firstName: "Mark",
      lastName: "Shafa",
      userName: "Balikis",
    },
  ];
  return (
    <div style={{margin: '1em'}}>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          {COLUMN_NAMES.map((columnName) => (
            <th key={columnName}>First Name</th>
          ))}
        </tr>
      </thead>
      <tbody>
          {TABLE_DATA.map((tableData) => (
            <tr key={tableData.firstName}>
              <td>{tableData.firstName}</td>
              <td>{tableData.lastName}</td>
              <td>{tableData.userName}</td>
            </tr>
          ))}
      </tbody>
    </Table>
    </div>
  );
};

export default TableView;
