import React, { CSSProperties, useMemo, useEffect } from 'react';
import { Slot } from "../../data/adSlots";
import { useForceAds, useUser } from "../../app/hooks";
import Ad from "./Ad";
import { useLocation } from "react-router-dom";
import ad from "./Ad";
import { useDispatch } from 'react-redux';

interface AdContainerParams {
    slots: Slot[]
    showLabel: number
    style?: CSSProperties | undefined
    adsData?: { code: string, min_level: number, label: number }[]
}

const AdContainer = ({ slots, showLabel, adsData, style }: AdContainerParams) => {
    const user = useUser();
    const forceAdsState = useForceAds();
    const location = useLocation();

    const slotsVisible = user && user.subscription_ends ? [] : slots.filter((slot, index) => {
        return forceAdsState || (user && user.current_level >= (adsData ? adsData[index]?.min_level : slot.min_level));
    });

    

    return useMemo(() => {
        return (
            <>
                {slotsVisible.length > 0 &&
                    <div className='ad-container' style={style}>
                        {showLabel == 1 ? <span>Advertisement:</span> : ''}
                        {slotsVisible.map((slot, index) => (adsData && adsData[index]?.code !== '') && <Ad key={slot.id} slot={slot} adObject={adsData && adsData[index]} adsCode={adsData && adsData[index]?.code} />)}
                    </div>}
            </>
        )
    }, [location.pathname]);
};

export default AdContainer;
