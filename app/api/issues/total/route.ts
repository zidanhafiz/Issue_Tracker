import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET() {
  try {
    const resAll = await prisma.issue.count();
    const resOpen = await prisma.issue.count({
      where: {
        status: 'OPEN',
      },
    });
    const resProgress = await prisma.issue.count({
      where: {
        status: 'IN_PROGRESS',
      },
    });
    const resClosed = await prisma.issue.count({
      where: {
        status: 'CLOSED',
      },
    });

    const data = [
      {
        name: 'Total All',
        total: resAll,
      },
      {
        name: 'Open',
        total: resOpen,
      },
      {
        name: 'In Progress',
        total: resProgress,
      },
      {
        name: 'Closed',
        total: resClosed,
      },
    ];

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
