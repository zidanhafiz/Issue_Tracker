import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '@/app/validation-schema';
import { revalidateTag } from 'next/cache';

enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

const getStatusType = (status?: string | null) => {
  switch (status) {
    case 'open':
      return Status.OPEN;
    case 'in_progress':
      return Status.IN_PROGRESS;
    case 'closed':
      return Status.CLOSED;
    case 'all':
      return 'ALL';
    case '':
      return 'ALL';
    case null:
      return 'ALL';
    case undefined:
      return 'ALL';
    default:
      return false;
  }
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const [search, s] = [searchParams.get('q') || '', searchParams.get('s')?.toLowerCase()];
  const status = getStatusType(s);

  if (!status) {
    return NextResponse.json({ error: 'Status not found!' }, { status: 404 });
  }

  if (search === '') {
    if (status === 'ALL') {
      try {
        const res = await prisma.issue.findMany();
        return NextResponse.json(res, { status: 200 });
      } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

    try {
      const res = await prisma.issue.findMany({
        where: { status: status },
      });
      return NextResponse.json(res, { status: 200 });
    } catch (err) {
      console.error('Error:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

  if (status === 'ALL') {
    try {
      const res = await prisma.issue.findMany({
        where: { title: { contains: search, mode: 'insensitive' } },
      });
      return NextResponse.json(res, { status: 200 });
    } catch (err) {
      console.error('Error:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

  try {
    const res = await prisma.issue.findMany({
      where: { status: status, title: { contains: search, mode: 'insensitive' } },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  revalidateTag('issues');
  return NextResponse.json(newIssue, { status: 201 });
}
