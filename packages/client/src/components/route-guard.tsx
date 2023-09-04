'use client'

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/libs/redux/hooks';
import { selectUserId } from '@/libs/redux/user/userSlice';
import { purge } from '@/libs/redux/store';

export { RouteGuard } 

function RouteGuard({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const url = usePathname()
    const searchParams = useSearchParams();
    const [authorized, setAuthorized] = useState(false);
    const user_id: string = useAppSelector(selectUserId);

    useEffect(() => {
        authCheck();
    }, [url, searchParams]);

    function authCheck() {
        // redirect to login page if accessing a private page and not logged

        const publicPaths = ['/entry', '/', '/auth'];
        const path = url.split('?')[0];

        if (!user_id && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push('/entry');
        } else if (user_id != "" && publicPaths.includes(url)) {
            purge()
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}