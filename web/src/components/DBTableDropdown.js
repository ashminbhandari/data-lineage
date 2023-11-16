import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DBTableDropdown = () => {
  const DB_NAME = "DB Name";
  const DB_TABLES = ["Queue", "Array", "Stack"];

  return (
    <div>
      <DropdownButton
        id="dropdown-table-item"
        title={`${DB_NAME} tables`}
        drop="down"
      >
        {DB_TABLES.map((table) => (
          <Dropdown.Item key={table} href="#/action-1" as="button">
            {table}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default DBTableDropdown;
