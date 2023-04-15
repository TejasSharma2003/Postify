import axios, { axiosPrivate } from "api/axios"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
    const { token: accessToken } = useSelector(state => state.auth);
    const refresh = useRefreshToken();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(config => {
            //Sending access token to server 
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config
        }, error => Promise.reject(error))


        //Add response Interceptors
        const responseInterceptor = axiosPrivate.interceptors.response.use(response => response, async error => {
            //Taking out the previous Request
            const preRequest = error?.config;

            //403 forbidden expired jwt 
            if (error?.response?.statusCode === 403 && !preRequest?.sent) {
                preRequest.sent = true;
                const newAccessToken = await refresh();
                preRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(preRequest);
            }
            return Promise.reject(error);
        })

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }

    }, [refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;