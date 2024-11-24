import React, { useRef } from 'react';
import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai'; // Import the plus-in-circle icon


const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  box-sizing: border-box;
  margin-left: ${props => props.sidebarWidth || '0px'};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  &:focus {
    outline: none;
    border-color: #0078d4;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #0078d4;
  }
`;

const SendButton = styled.button`
  background: #0078d4;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  min-width: 60px;
  &:hover {
    background: #006abc;
  }
`;

const FilePreview = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  padding: 10px 15px;
  background: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FileName = styled.span`
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatInput = ({ onSend, onFileUpload, sidebarWidth = '0px' }) => {
  const [inputText, setInputText] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsUploading(true);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onFileUpload(file);
      setIsUploading(false);
      setSelectedFile(null); // Clear the file preview after upload
    }
  };

  return (
    <>
      {selectedFile && (
        <FilePreview>
          <FileName>
            {isUploading ? 'Uploading: ' : ''}
            {selectedFile.name}
          </FileName>
        </FilePreview>
      )}
      <InputContainer sidebarWidth={sidebarWidth}>
        <InputWrapper>
          <FileButton onClick={() => fileInputRef.current.click()}>
            <AiOutlinePlusCircle /> {/* Use the vertical paperclip icon here */}
          </FileButton>
          <FileInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
          />
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <SendButton onClick={handleSubmit}>Send</SendButton>
        </InputWrapper>
      </InputContainer>
    </>
  );
};

export default ChatInput;
