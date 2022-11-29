import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useSate } from 'react';

export default function Dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    // see if user is logged
    /**
     * If loading is true, return. If user is false, return route.push("/auth/login");
     * @returns the result of the if statement.
     */
    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");
    };

    //Get users data
    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);
    
    return (
        <div>
            <h1>Your posts</h1>
            <div>posts</div>
            <button onClick={() => auth.signOut()}>Sign out</button>
        </div>
    );
}