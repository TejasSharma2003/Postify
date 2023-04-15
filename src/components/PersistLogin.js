import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import useRefreshToken from "hooks/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector(state => state.auth);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        //We only need to run verifyRefreshToken function when we actually lack accessToken.
        !token ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    return (
        <>
            {isLoading ? <Spinner /> : <Outlet />}
        </>
    )
}

export default PersistLogin;


