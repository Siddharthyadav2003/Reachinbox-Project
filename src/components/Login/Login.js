'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Logo = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
`;

const LoginBox = styled.div`
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleButton = styled(Button)`
  background-color: #2d2d2d;
  color: #ffffff;
  border: 1px solid #3d3d3d;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const CreateAccountButton = styled(Button)`
  background-color: #4285f4;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #3367d6;
  }
`;

const SignInLink = styled.p`
  font-size: 14px;
  color: #9e9e9e;

  a {
    color: #4285f4;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 10px;
  font-size: 12px;
  color: #9e9e9e;
`;

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoginContainer>Loading...</LoginContainer>;
  }

  if (session) {
    return (
      <LoginContainer>
        <Logo>
          <Image src="/reachinbox-logo.png" alt="Reachinbox Logo" width={200} height={40} />
        </Logo>
        <LoginBox>
          <Title>Welcome, {session.user.name || session.user.email}</Title>
          <GoogleButton onClick={() => router.push('/onebox')}>
            Go to Onebox
          </GoogleButton>
          <CreateAccountButton onClick={() => signOut()}>
            Sign out
          </CreateAccountButton>
        </LoginBox>
        <Footer>
          © 2023 Reachinbox. All rights reserved.
        </Footer>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <Logo>
        <Image src="/reachinbox-logo.png" alt="Reachinbox Logo" width={200} height={40} />
      </Logo>
      <LoginBox>
        <Title>Create a new account</Title>
        <GoogleButton onClick={() => signIn('google', { callbackUrl: '/onebox' })}>
          <Image src="/google-icon.png" alt="Google Icon" width={20} height={20} style={{marginRight: '10px'}} />
          Sign Up with Google
        </GoogleButton>
        <CreateAccountButton onClick={() => router.push('/signup')}>
          Create an Account
        </CreateAccountButton>
        <SignInLink>
          Already have an account? <Link href="/signin">Sign In</Link>
        </SignInLink>
      </LoginBox>
      <Footer>
        © 2023 Reachinbox. All rights reserved.
      </Footer>
    </LoginContainer>
  );
};

export default Login;