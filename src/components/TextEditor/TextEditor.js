'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  border: 1px solid ${props => props.theme.border};
  padding: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const TextEditor = ({ onSave }) => {
  const [content, setContent] = useState('');

  const handleSave = () => {
    onSave(content);
  };

  const insertVariable = () => {
    setContent(prev => prev + '{{VARIABLE}}');
  };

  return (
    <EditorContainer>
      <TextArea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={handleSave}>SAVE</Button>
      <Button onClick={insertVariable}>Variables</Button>
    </EditorContainer>
  );
};

export default TextEditor;