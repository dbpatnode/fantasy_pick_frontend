import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversationModal({ league, closeModal }) {
  const leagueMembers = league.join.map((join) => join.user);

  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedMemberIds);
    closeModal();
  }

  function handleCheckboxChange(memberId) {
    setSelectedMemberIds((prevSelectedMemberIds) => {
      if (prevSelectedMemberIds.includes(memberId)) {
        return prevSelectedMemberIds.filter((prevId) => {
          return memberId !== prevId;
        });
      } else {
        return [...prevSelectedMemberIds, memberId];
      }
    });
  }
  return (
    <>
      <Modal.Header closeButton> Start Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {leagueMembers.map((member) => (
            <Form.Group controlId={member.id} key={member.id}>
              <Form.Check
                type="checkbox"
                value={selectedMemberIds.includes(member.id)}
                label={member.username}
                onChange={() => handleCheckboxChange(member.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit"> Chat </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
