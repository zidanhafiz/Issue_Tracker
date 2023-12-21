import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '@/app/validation-schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getSortType, getStatusType } from '@/utils/utils';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const [search, s, sort] = [
    searchParams.get('q') || '',
    searchParams.get('s')?.toLowerCase(),
    searchParams.get('b'),
  ];
  const status = getStatusType(s);
  const sortBy = getSortType(sort);

  if (!status) {
    return NextResponse.json({ error: 'Status not found!' }, { status: 404 });
  }

  if (search === '') {
    if (status === 'ALL') {
      try {
        const res = await prisma.issue.findMany({
          orderBy: {
            createdAt: sortBy,
          },
        });
        return NextResponse.json(res, { status: 200 });
      } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

    try {
      const res = await prisma.issue.findMany({
        where: { status: status },
        orderBy: {
          createdAt: sortBy,
        },
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
        orderBy: {
          createdAt: sortBy,
        },
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
      orderBy: {
        createdAt: sortBy,
      },
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
  revalidatePath('/issues')
  return NextResponse.json(newIssue, { status: 201 });
}
