// src/components/LeftNavbar.js
import React from 'react';
import { Button } from 'react-bootstrap';

const LeftNavbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav
      className={`bg-dark text-light p-3 ${isSidebarOpen ? 'open' : ''}`}
      style={{ height: '100vh', position: 'fixed', top: 0, left: 0 }}
    >
      <Button
        variant="dark"
        className="mb-3"
        onClick={toggleSidebar}
      >
        + New Query
      </Button>

      <Button
        variant="dark"
        className="mb-3"
        onClick={() => alert('New query button clicked')}
      >
        |||
      </Button>
      {/* Additional navigation items can be added here */}
    </nav>
  );
};

export default LeftNavbar;