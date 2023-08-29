'use client'

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { addUserId, selectUserId } from '@/libs/redux/user/userSlice';
import { purge } from '@/libs/redux/store';

export { RouteGuard } 

function RouteGuard({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const url = usePathname()
    const [authorized, setAuthorized] = useState(false);

    const dispatch = useAppDispatch();
    const user_id = useAppSelector(selectUserId).user_id;

    useEffect(() => {
        authCheck();
    }, [url]);

    function authCheck() {
        // redirect to login page if accessing a private page and not logged in
        
        const publicPaths = ['/entry', '/', '/auth'];
        const path = url.split('?')[0];

        if (!user_id && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push('/entry');
        } else if (user_id != "" && publicPaths.includes(url)) {
            purge();
            dispatch(addUserId(""));
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}