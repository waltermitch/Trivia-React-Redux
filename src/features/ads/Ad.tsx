import InnerHTML from 'dangerously-set-html-content';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAdDecisionMaker, useSlots } from '../../app/hooks';
import { PREFIX, Slot } from "../../data/adSlots";
import { appendSlot } from '../../slices/quiz/answerSlice';

export interface AdParams {
    slot: Slot;
    adsCode?: string;
    adObject?: any;
}

const Ad = React.memo((params: AdParams) => {

    const { slot, adsCode, adObject } = params;
    const location = useLocation();
    const dispatch = useDispatch();
    const pushedSlots = useSlots();
    const adsDecider = useAdDecisionMaker();

    const [adState, setAdState] = React.useState<boolean>(false);
    const [timer, setTimer] = React.useState<boolean>(false)
    const [adsCodeString, setAdsCodeString] = React.useState<any>('')

    var onPage: any = false;

    React.useEffect(() => {
        if(!window.localStorage.getItem('isCompleted')) {
            dispatch(appendSlot(comparePagesAdSlot()))
        }
    }, [])

    const comparePagesAdSlot = () => {
        return {
            slot_name: slot.slot,
            pathName: location.pathname//.startsWith('/result') ? "result" : location.pathname.startsWith('/quiz') ? "question" : "home",
        }
    }

    const setAdsCodeStringData = (script:any) => {
        // if(window.localStorage.getItem("stop_init") == "true") {
        //     window.localStorage.removeItem("stop_init")
        // } else {
            setAdsCodeString(script)
        // }
    }

    useEffect(() => {
        // @ts-ignore
        // 
        try {
            if (slot.vendor === 'outbrain') {

            } else if (slot.vendor === 'proper') {
                // @ts-ignore
                if (typeof propertag !== 'undefined') {
                    // @ts-ignore
                    propertag.cmd.push(function () {
                        // 
                        // @ts-ignore
                        proper_display(slot.id);
                    });
                }
            }
        } catch (error) {
            // @ts-ignore
            alert(error.message);
        }

    }, []);
    var timerContainer: any;
    var showTimerScript: any = false;
    React.useEffect(() => {
        let previousActiveSlots: Array<Object> = [];
        for (var i in adsDecider) {//@ts-ignore
            previousActiveSlots = adsDecider[i];
            break;
        }

        console.log("previousActiveSlots :: " , previousActiveSlots)
        
        if (previousActiveSlots.length > 0) {
            if (previousActiveSlots.some((pSlot: any) => pSlot.slot_name === slot.slot)) {
                if(timer === undefined || timer === false) {
                    if (adObject.update_conditions === "pageview") {
                        setAdState(adObject?.refresh_or_destroy === 'destroy');
                        // 
                        if (adObject?.refresh_or_destroy === 'destroy') {
                            window.eval.call(window, '(function (pushedSlots) {' + adObject.destroy_code + '})')(pushedSlots);
                            setAdsCodeStringData(adsCode)
                        } else if (adObject?.refresh_or_destroy === 'refresh') {
                            window.eval.call(window, '(function (pushedSlots) {' + adObject.refresh_code + '})')(pushedSlots);
                        }
                        
                    } else {
                        onPage = true;
                        const seconds = adObject.time_in_seconds
                        clearTimeout(timerContainer);

                        timerContainer = setInterval(() => {
                            let newArray: any = {} ;
                            let prevTimer: number = 0 ;
                            let storedTimer: any = window.localStorage.getItem('storedTimer')
                            storedTimer = storedTimer ? JSON.parse(storedTimer) : {};
                            prevTimer = storedTimer[slot.id] || 0;
                            newArray = storedTimer
                            newArray[slot.id] = ++prevTimer

                            if(seconds<prevTimer) {
                                showTimerScript = true;
                                delete newArray[slot.id];
                                setTimer(true);
                                clearInterval(timerContainer)
                            }
                            
                            window.localStorage.setItem('storedTimer' , JSON.stringify(newArray))
                        }, 1000)
                    }
                }
            } else {
                window.eval.call(window, '(function (pushedSlots) {' + adObject.destroy_code + '})')(pushedSlots);
                setAdsCodeStringData(adsCode)
            }
        } else {
            setAdsCodeStringData(adsCode)
        }

    }, [timer])
    
    React.useEffect( () => () => {

        if(window.localStorage.getItem('isLastQuiz') === "true") { 
            window.eval.call(window, '(function (pushedSlots) {' + adObject.destroy_code + '})')(pushedSlots);
        } else if (onPage === true && showTimerScript === true ) {
            // const previousAnswer = useAnswer();
            if (adObject?.refresh_or_destroy === 'destroy') {
                window.eval.call(window, '(function (pushedSlots) {' + adObject.destroy_code + '})')(pushedSlots);
                if(adsCode) {
                    window.localStorage.setItem(slot.id+'_previousInit' , adsCode)
                }
            } else if (adObject?.refresh_or_destroy === 'refresh') {
                window.eval.call(window, '(function (pushedSlots) {' + adObject.refresh_code + '})')(pushedSlots);
            }
        } else if (onPage === true && showTimerScript === false) {
            clearInterval(timerContainer);
        }
    }, [] );

    React.useEffect(() => {
        if(window.localStorage.getItem(slot.id+'_previousInit') && window.localStorage.getItem('isLastQuiz') !== "true") {
            setAdsCodeStringData(window.localStorage.getItem(slot.id+'_previousInit'))
        }
        window.localStorage.removeItem(slot.id+'_previousInit')
    }, [location.pathname])

    /*useLayoutEffect(() => () => {
        // @ts-ignore
        propertag.cmd.push(function () {
            // @ts-ignore
            properDeleteSlot(slot.id);
            // @ts-ignore
            properDestroyDfpSlot(slot.id);
        });
    }, []);*/

    // return useMemo(() => {

    return (
        <>
            {
                <InnerHTML id={slot.id}
                    key={slot.id + location.pathname}
                    className={slot.className}
                    html={adsCodeString || ''} />
            }
        </>

    );



    // }, [location.pathname]);

    /*return (
        <Adsense
            key={slot.slot}
            client={slot.client}
            slot={slot.slot}
            style={{width: slot.width, maxHeight: '250px'}}
            adTest="on"
        />
    );*/
});

export default Ad;
