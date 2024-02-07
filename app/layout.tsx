import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import ReduxProvider from '@/components/ReduxProvider'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Theme>
        <Sidebar/>
        <div className='lg:ml-64 lg:mt-16'>
          <Toaster/>
          {children}
        </div>
        </Theme>
        </ReduxProvider>
      </body>
    </html>
  )
}
