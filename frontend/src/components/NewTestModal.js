import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
`;

const ModalHeader = styled.h3`
  margin-top: 0;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const ModalSelect = styled.select`
  margin-bottom: 10px;
  padding: 8px;
`;

const ModalButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const NewTestModal = ({ isOpen, onClose, onSave }) => {
  const [testName, setTestName] = useState('');
  const [question, setQuestion] = useState('');
  const [mediaType, setMediaType] = useState('text');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTest = {
      name: testName,
      prompts: [
        {
          promptText: question,
          requiredMediaType: mediaType,
        },
      ],
    };

    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTest),
      });

      if (response.ok) {
        onSave();
      } else {
        console.error('Error saving test');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ModalBackdrop isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Create New Test</ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          <ModalInput
            type="text"
            placeholder="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            required
          />
          <ModalInput
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <ModalSelect value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="text">Text</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="mixed">Mixed</option>
          </ModalSelect>
          <ModalButton type="submit">Save</ModalButton>
          <ModalButton type="button" onClick={onClose}>
            Cancel
          </ModalButton>
        </ModalForm>
      </ModalContent>
    </ModalBackdrop>
  );
}
