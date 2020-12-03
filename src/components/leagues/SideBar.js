import React, { useState } from "react";
import { Tab, Nav, Button } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function SideBar({ user }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      {/* changes state and the active tab back and forth */}
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content center">
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <Button>New {conversationsOpen ? "Conversatoion" : "Contacts"}</Button>
      </Tab.Container>
    </div>
  );
}

{
  /* <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav> */
}
