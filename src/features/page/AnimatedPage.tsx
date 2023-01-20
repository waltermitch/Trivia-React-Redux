import { motion } from 'framer';
import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation } from "react-router-dom";
import { removeGTM } from "../../data/adSlots";

export interface LayoutProps  {
    className: string
    animateIn?: boolean
    animateOut?: boolean
    children: React.ReactNode
}

const AnimatedPage = (props: LayoutProps) => {
    const location = useLocation();

    useEffect(() => {
      //  runGTM();
        // @ts-ignore
        // fbq('init', '4998456336937265');
        // // @ts-ignore
        // fbq('track', 'PageView');
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore
        window.dataLayer.push({
            event: 'Pageview',
            pagePath: location.pathname,
            pageTitle: location.pathname,
        });

        // @ts-ignore
        if (typeof properSpecialOps !== 'undefined') {
            // @ts-ignore
            properSpecialOps['spa_settings'] = {
                enabled: true,
                prefetch: true,//
                gallery_id: 'trivianerds',
                gallery_base_url: location.pathname,
            }
            // @ts-ignore
            
        }
        // @ts-ignore
        if (typeof properSpaNewPage !== 'undefined') {
            // @ts-ignore
            
            // @ts-ignore
            properSpaNewPage();
        }
    }, [location.pathname]);

    useLayoutEffect(() => () => {
        removeGTM();
    }, []);

    const animateIn = props.animateIn === undefined ? true : props.animateIn;
    const animateOut = props.animateOut === undefined ? true : props.animateOut;

    const pageVariants = {
        initial: {
            rotateY: animateIn ? -90 : 0,
        },
        in: {
            rotateY: 0,
        },
        out: {
            rotateY: animateOut ? 90 : 0,
        },
    }

    const pageTransition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
        delay: Math.random()
    };

    return (
        <motion.div className={props.className}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
            {props.children}
        </motion.div>
    );
};

export default AnimatedPage;
