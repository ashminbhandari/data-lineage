import React from "react";
import DBTableDropdown from "./DBTableDropdown";
import TableView from "./TableView";
import QueryMessage from "./QueryMessage";

const Bottom = () => {
  return (
    <div>
      <DBTableDropdown />
      <TableView />
      <QueryMessage />
    </div>
  );
};

export default Bottom;
