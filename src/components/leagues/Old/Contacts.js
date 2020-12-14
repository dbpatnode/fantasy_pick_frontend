import React from "react";
import { ListGroup } from "react-bootstrap";

export default function Contacts({ league }) {
  const users = league.join.map((join) => join.user);

  return (
    <ListGroup variant="flush">
      {users.map((user) => (
        <ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
