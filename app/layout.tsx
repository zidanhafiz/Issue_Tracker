import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Check your app issue',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <Theme
          appearance='light'
          accentColor='teal'
          grayColor='sand'
          radius='large'
          scaling='105%'
        >
          <Navbar />
          <main className='px-6 py-8 max-w-screen-xl mx-auto'>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
