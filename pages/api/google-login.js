'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function GoogleLogin() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('auth_token', token);

      // Use NextAuth's signIn function to create a session
      signIn('credentials', { 
        token: token, 
        redirect: false 
      }).then(() => {
        router.push('/onebox');
      });
    } else {
      console.error('No token received');
      router.push('/');
    }
  }, [router]);

  return <div>Processing login...</div>;
}