import React from 'react';
import styled from 'styled-components';

const EmailListContainer = styled.div`
  width: 300px;
  border-right: 1px solid ${props => props.theme.border};
  overflow-y: auto;
`;

const EmailItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.hover};
  }
`;

const EmailList = ({ threads, onSelectThread }) => {
  return (
    <EmailListContainer>
      {threads.map(thread => (
        <EmailItem key={thread.id} onClick={() => onSelectThread(thread.id)}>
          <h4>{thread.subject}</h4>
          <p>{thread.snippet}</p>
        </EmailItem>
      ))}
    </EmailListContainer>
  );
};

export default EmailList;