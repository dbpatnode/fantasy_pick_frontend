import React from "react";
import Login from "./Login";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";

function Chat({ user }) {
  let id = user.uuid;

  
   return (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  ); 
}

export default Chat;
