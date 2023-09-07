import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const institution_name = body.institution;
    const user_id = body.user_id;

    const status = (await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/RemoveBank', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ institution_name, user_id })
    })).status
    console.log(status);

    return NextResponse.json(status)
}