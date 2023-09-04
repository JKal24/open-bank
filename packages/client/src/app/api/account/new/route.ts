import { parseJSONReadableStream } from '@/libs/requests/stream';
import { retrieveAccessToken } from "../../token/route";
import { NextResponse } from 'next/server';
import { AbstractedItem, UserBankData } from '@openbank/types';

export async function POST(request: Request) {
    const body = await request.json()

    const accessToken = await retrieveAccessToken(body.publicToken);
    const userBankData: UserBankData = {
        accessToken, user_id: body.user_id, institutionName: body.institutionName
    }

    const item: AbstractedItem = await initializeAccount(userBankData);
    return NextResponse.json(item)
}

const initializeAccount = async (userBankData: UserBankData): Promise<AbstractedItem> => {
    const output = await parseJSONReadableStream<AbstractedItem>(fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/AddBank', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBankData)
    }));
    return output;
}