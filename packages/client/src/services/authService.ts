import { parseReadableStream } from "@/libs/requests/stream";
import { AbstractedUser } from "@/types/users";

export class AuthService {

    login: (email: string, password: string) => Promise<AbstractedUser> = async (email: string, password: string) => {
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
}