import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: ${props => props.theme.secondary};
  padding: 20px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h3>Reachinbox</h3>
      {/* Add sidebar items here */}
    </SidebarContainer>
  );
};

export default Sidebar;