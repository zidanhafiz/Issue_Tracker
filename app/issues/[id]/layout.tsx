import { baseUrl, getIssueDetail } from '@/utils/httpRequest';
import { Metadata, ResolvingMetadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = parseInt(params.id);

  const issue: Issue = await getIssueDetail(baseUrl, id);

  return {
    title: `Issue | ${issue.title}`,
    description: `Description of ${issue.title}`,
  };
}

export default function DetailsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
