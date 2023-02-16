import { useEffect } from 'react';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { MainLayout } from '@/layouts/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(()=>{},[])

  return (
    <UserProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </UserProvider>
  )
}
