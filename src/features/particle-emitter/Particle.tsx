import { motion } from 'framer';
import React, {useEffect, useState} from 'react';
import star from "../../assets/star.png";
import {randomRange} from "../../utils/randomRange";
import shortid from 'shortid';

const Particle = () => {
    const destinationX = (Math.random() - 0.5) * 2 * 200;
    const destinationY = (Math.random() - 0.5) * 2 * 200;

    let variants = {
        initial: {
            scale: 0,
            opacity: 0,
            x: -20,
            y: -20,
        },
        in: {
            scale: [0, 1, 1, 1, 0],
            opacity: [0, 1, 1, 1, 0],
            x: destinationX,
            y: destinationY,
        }
    }

    const transition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.7,
        delay: 1 + randomRange(0, 5)
    };

    return (
        <motion.div className="particle"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={variants}
                    transition={transition}>
            <img src={star} alt='Token Star' />
        </motion.div>
    );
};

export default Particle;
