import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeQuery } from "../graphql/graphql";

export const useIsAuth = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [{ data: me, fetching: loginFetching }] = useMeQuery();
    useEffect(() => {
        if (!loginFetching && !me?.me) {
            navigate('/login', { state: { previousPath: pathname } })
        }
    }, [loginFetching, me, navigate]);
};