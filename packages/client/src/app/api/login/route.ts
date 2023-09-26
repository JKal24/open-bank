import { parseReadableStream } from "@/libs/requests/stream";
import { AbstractedUser } from "@/types/users";
import Cookies from "js-cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json()
    const user = await login(body.email, body.password);
    Cookies.set('jwt', user.access_token);
    return NextResponse.json(user)
}

const login: (email: string, password: string) => Promise<AbstractedUser> = async (email: string, password: string) => {
    const userResponse = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/GetUserId', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (userResponse.status === 401 || !userResponse.ok) {
        return null;
    }
    return JSON.parse(await parseReadableStream(userResponse));
};