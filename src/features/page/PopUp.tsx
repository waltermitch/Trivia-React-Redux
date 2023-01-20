import {AnimatePresence, motion} from 'framer';
import React, {useEffect, useState} from 'react';
import tapSfx from "../../assets/sounds/tap.mp3";
import useSound from "../../app/audio/audio";
import './PopUp.css';

export interface PopupParams {
    children: React.ReactNode | React.ReactNode[];
    show: boolean;
}

const PopUp = ({children, show}: PopupParams) => {

    const [popupVisible, setPopupVisible] = useState(true);
    const {audio: tapAudio} = useSound(tapSfx);

    useEffect(() => {
        if (show && !popupVisible) {
            setPopupVisible(true);
        } else if (!show && popupVisible) {
            setPopupVisible(false);
        }
    }, [show, popupVisible]);

    function onInteraction() {
        // @ts-ignore
        if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
            // @ts-ignore
            Howler.ctx.resume();
        }
        tapAudio?.play();
        setPopupVisible(false);
    }

    const overlayVariants = {
        initial: {
            opacity: 0,
        },
        in: {
            opacity: 1,
        },
        out: {
            opacity: 0,
        }
    }

    const goalVariants = {
        initial: {
            y: -1000,
        },
        in: {
            y: 0,
        },
        out: {
            opacity: -1000,
        }
    }

    const transition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.3,
        delayChildren: 0.3
    };

    return (
        <AnimatePresence exitBeforeEnter>
            {popupVisible && <motion.div className='overlay'
                                         initial="initial"
                                         animate="in"
                                         exit="out"
                                         variants={overlayVariants}
                                         transition={transition}
                                         onClick={onInteraction}>
              <motion.div className='popup'
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={goalVariants}
                          transition={transition}>
                  {children}
              </motion.div>
            </motion.div>}
        </AnimatePresence>
    );
};

export default PopUp;
