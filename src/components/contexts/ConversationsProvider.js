import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children, league }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const users = league.join.map((join) => join.user);
  


  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

const formattedConversations = conversations.map(conversation => {
  const recipients = conversation.recipients.map(recipient => {
    const member = users.find(user => {
      return user.id === recipient
    })
    const name = (member && member.username) || recipient
    return { id: recipient, name}
  })
  return { ...conversation, recipients}
})
const value = {
  conversations: formattedConversations, 
  createConversation 
}

  return (
    <ConversationsContext.Provider
      value={value}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
