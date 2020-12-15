import React from "react";
import Login from "./Login";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConversationsProvider } from "../../contexts/ConversationsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";
import PageNotFound from "../PageNotFound"
function Chat({ user }) {
  let id = user.uuid;
 if(user.user) {
   
   return (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  ); 
 } else {
   return <> <PageNotFound/> </>
 }
}

export default Chat;
