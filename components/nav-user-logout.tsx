"use client";

import { useClerk } from '@clerk/nextjs';

export default function NavUserLogOut() {
    const { signOut } = useClerk();
    const handleLogout = async () => {
        try {
            await signOut({ redirectUrl: '/' });
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }
    return ( <div onClick={handleLogout}>Logout</div> )
}