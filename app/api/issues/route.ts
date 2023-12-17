import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '@/app/validation-schema';
import { revalidateTag } from 'next/cache';

export async function GET() {
  try {
    const res = await prisma.issue.findMany();
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
