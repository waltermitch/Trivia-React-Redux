import React, {useEffect} from 'react';
import {Redirect, Route, useLocation, useRouteMatch} from "react-router-dom";
import {useUser} from "../../app/hooks";
import {useGetUserQuery, useGetLvlDataQuery, useGetRankQuery} from "../../app/services/user";
import { removeProperStickyAd } from '../../data/adSlots';
import LoaderOverlay from './LoaderOverlay';

export interface PrivateRouteParams {
    children: React.ReactNode | React.ReactNode[];
    [k: string]: any
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteParams) => {
    //const { data: user, isLoading, refetch: refetchUser } = useGetUserQuery();
    const location = useLocation();
    let user = useUser();

    const isSearchParams = location?.search

    const queryParam = isSearchParams ? location.search.substring(1) : '';
    const serializeParams = (user?.utm_campaign && user.utm_source) ? {
        utm_campaign: user?.utm_campaign,
        utm_source: user.utm_source
    } : (user?.utm_campaign) ? {
        utm_campaign: user?.utm_campaign,
    } : (user?.utm_source) ? {
        utm_source: user?.utm_source,
    } : isSearchParams ? Object.fromEntries(new URLSearchParams(queryParam)) :
        {}

    const { data, isLoading,refetch: refetchUser} = useGetUserQuery(serializeParams);
    // const { isLoading:lvlLoading } = useGetLvlDataQuery();
    // const { isLoading:rankLoading } = useGetRankQuery();
    user = user || data;

    useEffect(() => {
        // refetchUser();
        removeProperStickyAd();
    }, []);

    // console.log('PrivateRoute', user);
    const background = location.state && (location.state as { background: any }).background;
    return (
        <Route
            {...rest}
            render={() =>
                (!user || isLoading )? <LoaderOverlay /> : (
                    user.email ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: `/email`,
                                state: { background: background || location }
                            }}
                        />
                    )
                )
            }
        />
    );
}

export default PrivateRoute;
