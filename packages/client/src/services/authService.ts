import { parseReadableStream } from "@/libs/requests/stream";
import { AbstractedUser } from "@openbank/types";

export class AuthService {

    login: (email: string, password: string) => Promise<AbstractedUser> = async (email: string, password: string) => {
        const userResponse = await fetch(process.env.SERVER_URL + '/GetUserId', {
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
}