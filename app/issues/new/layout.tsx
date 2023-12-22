import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Issue Tracker | Create New Issue',
  description: 'Create new issue',
};

export default function NewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
