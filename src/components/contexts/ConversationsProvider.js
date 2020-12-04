import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ConversationsContext = React.createContext();

export function useConversations() {

  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children, league, user }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const users = league.join.map((join) => join.user);
  


  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  function addMessageToConversation({ recipients, text, sender}) {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text}
      const newConversations = prevConversations.map(conversation => {
        if(arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {...conversation, messages: [conversation.messages, newMessage]}
        }

        return conversation 
      })
      if (madeChange) {
        return newConversations
      } else {
        return [...prevConversations, {recipients, messages: [newMessage]}]
      }
    })
  }

  function sendMessage(recipients, text) {
    console.log(user)
    addMessageToConversation({ recipients, text, sender: user.id})
  }


const formattedConversations = conversations.map((conversation, index) => {
  const recipients = conversation.recipients.map(recipient => {
    const member = users.find(user => {
      return user.id === recipient
    })
    const name = (member && member.username) || recipient
    return { id: recipient, name}
  })
  const selected = index === selectedConversationIndex
  return { ...conversation, recipients, selected}
})
const value = {
  conversations: formattedConversations, 
  createConversation,
  sendMessage,
  selectedConversationIndex: setSelectedConversationIndex, 
  selectedConversation: formattedConversations[selectedConversationIndex]
}

  return (
    <ConversationsContext.Provider
      value={value}
    >
      {children}
    </ConversationsContext.Provider>
  );
}


function arrayEquality(a,b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}