import { useEffect } from 'react';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { MainLayout } from '@/layouts/MainLayout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(()=>{},[])

  return (
    <UserProvider>
      { router.pathname!=='/login' ? (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
      ) : (
        <Component />
      ) 
      }
    </UserProvider>
  )
}
