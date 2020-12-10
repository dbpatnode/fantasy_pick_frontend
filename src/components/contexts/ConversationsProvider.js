import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children, league, user }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const users = league.join.map((join) => join.user);
  const socket = useSocket();

  function createConversation(recipients, league) {
    setConversations((prevConversations) => {
      return [
        ...prevConversations,
        { recipients, messages: [], league: league.id },
      ];
    });
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender, league }) => {
      setConversations((prevConversations) => {
        let madeChange = false;

        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });
        if (madeChange) {
          return newConversations;
        } else {
          debugger;
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({
      recipients,
      text,
      sender: user.id,
    });
  }
  const leagueConversation = conversations.filter((conversation) => {
    return conversation.league === league.id;
  });

  const userLeagueConversations = leagueConversation.filter((conversation) =>
    conversation.recipients.includes(user.id)
  );

  const formattedConversations = userLeagueConversations.map(
    // const formattedConversations = leagueConversation.map(
    (conversation, index) => {
      const recipients = conversation.recipients.map((recipient) => {
        const member = users.find((user) => {
          return user.id === recipient;
        });
        const name = (member && member.username) || recipient;
        return { id: recipient, name };
      });
      const messages = conversation.messages.map((message) => {
        const member = users.find((user) => {
          return user.id === message.sender;
        });
        const name = (member && member.username) || message.sender;
        const fromMe = user.id === message.sender;
        return { ...message, senderName: name, fromMe };
      });
      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    createConversation,
    sendMessage,
    selectedConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
