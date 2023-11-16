import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const DatabaseCredentials = () => {
  return (
    <div className="d-flex flex-column p-3 flex-md-row shadow-lg justify-content-md-between align-items-md-center">
      <div className="d-flex flex-column flex-md-row mb-2 mb-md-0 justify-content-md-center align-items-md-center">
        <Form.Label htmlFor="host" className="me-md-2">
          DBHost
        </Form.Label>
        <Form.Control type="text" id="host" aria-describedby="host name" />
      </div>
      <div className="d-flex flex-column flex-md-row mb-2 mb-md-0 justify-content-md-center align-items-md-center">
        <Form.Label htmlFor="user" className="me-md-2">
          DBUsername
        </Form.Label>
        <Form.Control type="text" id="user" aria-describedby="user name" />
      </div>
      <div className="d-flex flex-column flex-md-row mb-2 mb-md-0 justify-content-md-center align-items-md-center">
        <Form.Label htmlFor="dbPassword" className="me-md-2">
          DBPassword
        </Form.Label>
        <Form.Control
          type="password"
          id="dbPassword"
          aria-describedby="db password"
        />
      </div>
      <Button variant="primary">Connect</Button>
    </div>
  );
};

export default DatabaseCredentials;
