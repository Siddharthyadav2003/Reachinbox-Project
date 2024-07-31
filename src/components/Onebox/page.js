'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../contexts/AppContext';
import Onebox from '../../components/Onebox/Onebox';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2d2d2d;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: normal;
  color: #ffffff;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const WorkspaceSelector = styled.div`
  margin-right: 10px;
  color: #ffffff;
`;

const ThemeToggle = styled.button`
  width: 24px;
  height: 24px;
  background-color: #444;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

export default function OneboxPage() {
  const { user, toggleTheme } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <PageContainer>
      <Header>
        <Title>Onebox</Title>
        <UserMenu>
          <WorkspaceSelector>{user.workspace || "User's Workspace"}</WorkspaceSelector>
          <ThemeToggle onClick={toggleTheme} />
        </UserMenu>
      </Header>
      <Onebox />
    </PageContainer>
  );
}