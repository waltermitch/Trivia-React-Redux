import React, {ReactNode, useEffect, useRef, useState} from 'react';
import './Emitter.css';
import Particle from "./Particle";
import coinsSfx from "../../assets/sounds/coins.mp3";
import useSound from "../../app/audio/audio";

const Emitter = () => {
    const el = useRef<HTMLDivElement>(null);
    const [particlesState, setParticles] = useState<ReactNode[]>();
    const {audio} = useSound(coinsSfx);


    useEffect(() => {
        emit();
    }, []);

    const emit = () => {
        let particles:ReactNode[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push(<Particle key={`particle_${i}`} />)
        }
        setParticles(particles);
        // @ts-ignore
        if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
            // @ts-ignore
            Howler.ctx.resume();
        }
        audio?.play();
    }

    return (
        <div ref={el} className='emitter'>
            {
                particlesState?.map(particle => particle)
            }
        </div>
    );
};

export default Emitter;
