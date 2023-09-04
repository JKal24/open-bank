import { parseJSONReadableStream } from '@/libs/requests/stream';
import { AbstractedBank } from '@openbank/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const user_id: string = await request.json()

    const bank: AbstractedBank = await parseJSONReadableStream<AbstractedBank>(fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/GetBank', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_id)
    }));
    return NextResponse.json(bank)
}