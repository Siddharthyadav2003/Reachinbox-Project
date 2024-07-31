'use client';

import React from 'react';
import styled from 'styled-components';
import TextEditor from '../TextEditor/TextEditor';

const EmailContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.isDarkMode ? '#2d2d2d' : '#f5f5f5'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#333333'};
  overflow-y: auto;
`;

const EmailHeader = styled.div`
  margin-bottom: 20px;
`;

const Subject = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const EmailDetails = styled.div`
  font-size: 14px;
  color: ${props => props.isDarkMode ? '#bbb' : '#666'};
  margin-bottom: 10px;
`;

const EmailBody = styled.div`
  margin-bottom: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.isDarkMode ? '#444' : '#e0e0e0'};
  color: ${props => props.isDarkMode ? 'white' : 'black'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.isDarkMode ? '#555' : '#d0d0d0'};
  }
`;

const ReplyContainer = styled.div`
  margin-top: 20px;
`;

const EmailContent = ({ thread, onDelete, onReply, showReplyBox, setShowReplyBox, isDarkMode }) => {
  const handleReply = async (content) => {
    try {
      await onReply({
        from: 'user@example.com',
        to: thread.from,
        subject: `Re: ${thread.subject}`,
        body: content,
      });
      setShowReplyBox(false);
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  if (!thread) {
    return <EmailContentContainer isDarkMode={isDarkMode}>Select an email to view</EmailContentContainer>;
  }

  return (
    <EmailContentContainer isDarkMode={isDarkMode}>
      <EmailHeader>
        <Subject>{thread.subject}</Subject>
        <EmailDetails isDarkMode={isDarkMode}>
          <div>From: {thread.from}</div>
          <div>To: {thread.to}</div>
          <div>Date: {new Date(thread.date).toLocaleString()}</div>
        </EmailDetails>
      </EmailHeader>
      
      <EmailBody dangerouslySetInnerHTML={{ __html: thread.body }} />
      
      <ActionButtons>
        <Button onClick={() => setShowReplyBox(true)} isDarkMode={isDarkMode}>Reply</Button>
        <Button onClick={() => onDelete(thread.id)} isDarkMode={isDarkMode}>Delete</Button>
      </ActionButtons>
      
      {showReplyBox && (
        <ReplyContainer>
          <TextEditor onSave={handleReply} isDarkMode={isDarkMode} />
          <Button onClick={() => setShowReplyBox(false)} isDarkMode={isDarkMode}>Cancel</Button>
        </ReplyContainer>
      )}
    </EmailContentContainer>
  );
};

export default EmailContent;