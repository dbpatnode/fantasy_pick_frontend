import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      let contact = prevContacts.find((c) => c.id === id);
      debugger;
      if (contact) {
        alert(`This Id is already in your contact list as ${contact.name}`);
        return prevContacts;
      } else {
        return [...prevContacts, { id, name }];
      }
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
