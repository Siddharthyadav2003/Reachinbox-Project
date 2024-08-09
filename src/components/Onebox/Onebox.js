
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import EmailList from '../EmailList/EmailList';
import EmailContent from '../EmailContent/EmailContent';
import LeadDetails from '../LeadDetails/LeadDetails';
import Sidebar from '../Sidebar/Sidebar';
import { useApp } from '../../contexts/AppContext';

// ... (Other styled components)

const EmptyStateIcon = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="#2D2D2D"/>
    <path d="M30 45H120V105H30V45Z" stroke="white" strokeWidth="2"/>
    <path d="M30 45L75 75L120 45" stroke="white" strokeWidth="2"/>
  </svg>
);

const OneboxContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.isDarkMode ? '#2d2d2d' : '#f5f5f5'};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: normal;
  color: ${props => props.isDarkMode ? '#ffffff' : '#333333'};
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const WorkspaceSelector = styled.div`
  margin-right: 10px;
  color: ${props => props.isDarkMode ? '#ffffff' : '#333333'};
`;

const ThemeToggle = styled.button`
  width: 24px;
  height: 24px;
  background-color: ${props => props.isDarkMode ? '#ffffff' : '#333333'};
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const AuthenticatedOnebox = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const { isDarkMode, toggleTheme } = useApp();

  const fetchThreads = useCallback(async () => {
    try {
      const response = await fetch('/api/onebox/list');
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error('Failed to fetch threads:', error);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleDeleteThread = useCallback(async (threadId) => {
    try {
      await fetch(`/api/onebox/${threadId}`, { method: 'DELETE' });
      fetchThreads();
      setSelectedThread(null);
      setShowReplyBox(false);
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  }, [fetchThreads]);

  const handleKeyPress = useCallback((e) => {
    if (selectedThread) {
      if (e.key === 'd' || e.key === 'D') {
        handleDeleteThread(selectedThread.id);
      } else if (e.key === 'r' || e.key === 'R') {
        setShowReplyBox(true);
      }
    }
  }, [selectedThread, handleDeleteThread]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleThreadSelect = async (threadId) => {
    try {
      const response = await fetch(`/api/onebox/${threadId}`);
      const data = await response.json();
      setSelectedThread(data);
      setShowReplyBox(false);
    } catch (error) {
      console.error('Failed to fetch thread:', error);
    }
  };

  const handleReply = async (replyData) => {
    try {
      const response = await fetch(`/api/reply/${selectedThread.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),
      });
      if (response.ok) {
        setShowReplyBox(false);
        handleThreadSelect(selectedThread.id);
      } else {
        throw new Error('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <OneboxContainer>
      <Sidebar isDarkMode={isDarkMode} />
      <MainContent>
        <Header isDarkMode={isDarkMode}>
          <Title isDarkMode={isDarkMode}>Onebox</Title>
          <UserMenu>
            <WorkspaceSelector isDarkMode={isDarkMode}>Tim&apos;s Workspace</WorkspaceSelector> {/* Changed ' to &apos; */}
            <ThemeToggle onClick={toggleTheme} isDarkMode={isDarkMode} />
          </UserMenu>
        </Header>
        <ContentArea>
          {threads.length > 0 ? (
            <>
              <EmailList 
                threads={threads} 
                onSelectThread={handleThreadSelect} 
                isDarkMode={isDarkMode} 
              />
              {selectedThread && (
                <EmailContent 
                  thread={selectedThread} 
                  onDelete={handleDeleteThread}
                  onReply={handleReply}
                  showReplyBox={showReplyBox}
                  setShowReplyBox={setShowReplyBox}
                  isDarkMode={isDarkMode}
                />
              )}
              {selectedThread && <LeadDetails lead={selectedThread.lead} isDarkMode={isDarkMode} />}
            </>
          ) : (
            <EmptyState>
              <EmptyStateIcon />
              <h2>It&apos;s the beginning of a legendary sales pipeline</h2> {/* Changed ' to &apos; */}
              <p>When you have inbound E-mails you&apos;ll see them here</p>  {/* Changed ' to &apos; */}
            </EmptyState>
          )}
        </ContentArea>
      </MainContent>
    </OneboxContainer>
  );
};

export default AuthenticatedOnebox;
