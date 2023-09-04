import { AuthService } from "@/services/authService";
import Cookies from "js-cookie";
import { AbstractedUser } from "@openbank/types";

const authService: AuthService = new AuthService();

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const user = await authService.login(username, password);
        if (user) {
            Cookies.set("user_id", user.user_id);
        }
        return user as AbstractedUser;
    };

    return { login };
};