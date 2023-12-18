import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { revalidateTag } from 'next/cache';

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