import './globals.css';
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://issue-tracker-megumi.vercel.app'),
  title: 'Issue Tracker | Dashboard',
  description: 'Check your app issue',
  openGraph: {
    title: 'Issue Tracker',
    description:
      'Issue tracker website for write, check or tracking your issues that you have.',
    url: 'https://issue-tracker-megumi.vercel.app',
    siteName: 'Issue Tracker',
    images: [
      {
        url: './opengraph-image.png',
        width: 800,
        height: 600,
      },
      {
        url: './opengraph-image.png',
        width: 1800,
        height: 1600,
        alt: 'Issue Tracker',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
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
          <ToastContainer />
        </Theme>
      </body>
    </html>
  );
}
