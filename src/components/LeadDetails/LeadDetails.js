import React from 'react';
import styled from 'styled-components';

const LeadDetailsContainer = styled.div`
  width: 250px;
  padding: 20px;
  background-color: ${props => props.theme.secondary};
`;

const LeadDetails = ({ lead }) => {
  if (!lead) {
    return null;
  }

  return (
    <LeadDetailsContainer>
      <h3>Lead Details</h3>
      <p>Name: {lead.name}</p>
      <p>Email: {lead.email}</p>
      <p>Company: {lead.company}</p>
      {/* Add more lead details as needed */}
    </LeadDetailsContainer>
  );
};

export default LeadDetails;