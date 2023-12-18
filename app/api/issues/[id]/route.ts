import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { revalidateTag } from 'next/cache';
import { updateIssueSchema } from '@/app/validation-schema';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const res = await prisma.issue.findUniqueOrThrow({ where: { id: id } });
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const res = await prisma.issue.delete({ where: { id: id } });
    revalidateTag('issues');
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const s = req.nextUrl.searchParams.get('id');
  const id = parseInt(params.id);
  const body = await req.json();
  const validation = updateIssueSchema.safeParse(body);

  console.log('ini:', s);

  const data = {
    ...body,
    title: body.title,
    description: body.description,
    status: body.status,
  };

  console.log(data);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.update({
    where: {
      id: id,
    },
    data: data,
  });

  revalidateTag('issues');
  return NextResponse.json(newIssue, { status: 201 });
}
