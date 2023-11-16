import React from "react";
import DBTableDropdown from "./DBTableDropdown";
import TableView from "./TableView";
import QueryMessage from "./QueryMessage";

const Bottom = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <DBTableDropdown />
      <TableView />
      <QueryMessage />
    </div>
  );
};

export default Bottom;
