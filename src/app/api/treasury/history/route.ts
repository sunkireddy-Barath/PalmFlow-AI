import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, subDays, format } from 'date-fns';

export async function GET() {
  try {
    // Generate the last 7 days of labels
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return format(date, 'MMM dd');
    });

    // Fetch real transactions grouped by day (simplified for demo)
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: subDays(new Date(), 7)
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Mocking the cumulative balance for the chart
    let currentBalance = 10000; // Starting baseline
    const data = days.map(day => {
      const dayTxs = transactions.filter(tx => format(tx.createdAt, 'MMM dd') === day);
      const dayNet = dayTxs.reduce((acc, tx) => acc + (tx.type === 'deposit' ? tx.amount : -tx.amount), 0);
      currentBalance += dayNet;
      
      return {
        name: day,
        balance: currentBalance,
        volume: Math.abs(dayNet)
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch treasury history' }, { status: 500 });
  }
}
