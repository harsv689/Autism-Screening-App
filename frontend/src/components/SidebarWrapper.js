import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NewTestModal from './NewTestModal'; // Modal component

const SidebarWrapper = ({ onParticipantInfoClick, onTestSelect }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Open modal when "Create New Test" is clicked
  const handleCreateTest = () => {
    setModalOpen(true);
  };

  // Close modal logic
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTestSave = () => {
    setModalOpen(false); // Close modal after saving the test
  };

  return (
    <>
      {/* Pass the handleCreateTest function to Sidebar */}
      <Sidebar
        isOpen={true}
        onParticipantInfoClick={onParticipantInfoClick}
        onTestSelect={onTestSelect}
        onCreateTest={handleCreateTest} // Linking the sidebar button
      />
      
      {/* Render modal conditionally */}
      {isModalOpen && (
        <NewTestModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleTestSave}
        />
      )}
    </>
  );
};

export default SidebarWrapper;
