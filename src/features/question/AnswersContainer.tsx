import { motion, Variants } from 'framer';
import { Howler } from "howler";
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import useSound from "../../app/audio/audio";
import { useUser } from "../../app/hooks";
import AnswerModel from '../../app/models/AnswerModel';
import tapSfx from "../../assets/sounds/tap.mp3";
import { aboveButtonSlot, belowButtonSlot, belowButtonSlot2 } from "../../data/adSlots";
import AdContainer from "../ads/AdContainer";
import { Button } from '../framer/Button';

export interface AnswersContainerParams {
    image: string;
    variants: Variants;
    answers: Array<AnswerModel>;
    onAnswered: Function;
    onSkipped: Function;
    adsData:any
}

const AnswersContainer = ({answers, image, variants, onAnswered, onSkipped,adsData}: AnswersContainerParams) => {


    //code to make image load before component render
    const [imageIsReady, setImageIsReady] = useState<boolean>(false);
    const img = new Image();
    img.onload = () => {
      // when it finishes loading, update the component state
      setImageIsReady(true);
    }
    img.src = image; // by setting an src, you trigger browser download
  

    const user = useUser();
    const {audio} = useSound(tapSfx);
    const location = useLocation();
    
    function onInteraction(answer: AnswerModel) {
        // @ts-ignore
        if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
            // @ts-ignore
            Howler.ctx.resume();
        }
        audio?.play();
        window.scroll({top: 0, behavior: 'smooth'});
        onAnswered(answer.id);
    }

    function onSkipInteraction() {
        // @ts-ignore
        if (['suspended', 'interrupted'].includes(Howler.ctx.state)) {
            // @ts-ignore
            Howler.ctx.resume();
        }
        audio?.play();
        window.scroll({top: 0, behavior: 'smooth'});
        onSkipped();
    }

    // return useMemo(() => {

    console.log(`${process.env.REACT_APP_BASE_URL}${image}`)
        return (
        <motion.div className='white-container answers' variants={variants} key={'answer-'+location.pathname}>
            {img && <div className='answer-container'>
                <div className="question-image-cover">
                    {image && <img className='question-image' src={`${process.env.REACT_APP_BASE_URL}${image}`} alt='question'/>}
                </div>

                    {(adsData && adsData.above_buttons && adsData.above_buttons.code !== '') && <AdContainer showLabel={adsData?.above_buttons.label} adsData={adsData && [adsData.above_buttons]} slots={aboveButtonSlot} style={{background: adsData?.above_buttons.label==1 ? 'rgba(0, 0, 0, 0.5)' : '', color:'white'}} />}
                    
                    {user && <Button
                        key='skip'
                        borderRadius={28}
                        defaultBackground="rgb(255, 20, 228)"
                        hoverBackground="rgb(199, 0, 176)"
                        padding={18}
                        pressedBackground="rgb(250, 46, 216)"
                        text="Skip (2500 tokens)"
                        whileHoverScale={1.1}
                        whileTapScale={1.2}
                        style={styles.mainButton}
                        disabled={user.tokens < 2500}
                        onClick={onSkipInteraction}
                    />}
                    {answers.map((answer) => {
                        return <Button
                            key={answer.id}
                            borderRadius={28}
                            defaultBackground="rgb(85, 23, 255)"
                            hoverBackground="rgb(60, 0, 189)"
                            padding={18}
                            pressedBackground="rgb(131, 74, 252)"
                            shadow={true}
                            text={answer.answer}
                            whileHoverScale={1.1}
                            whileTapScale={1.2}
                            style={styles.mainButton}
                            onClick={() => onInteraction(answer)}
                        />
                    })
                    }
                    {(adsData && adsData.below_buttons && adsData.below_buttons.code !== '') && <AdContainer showLabel={adsData?.below_buttons.label} adsData={adsData && [adsData.below_buttons]} slots={belowButtonSlot} style={{background: adsData?.below_buttons.label==1 ? 'rgba(0, 0, 0, 0.5)' : '', color:'white'}} />}
                    {(adsData && adsData.below_buttons_2 && adsData.below_buttons_2.code !== '') && <AdContainer showLabel={adsData?.below_buttons_2.label} adsData={adsData && [adsData.below_buttons_2]} slots={belowButtonSlot2} style={{background: adsData?.below_buttons_2.label==1 ? 'rgba(0, 0, 0, 0.5)' : '', color:'white'}} />}
            
            </div>}
        </motion.div>
        )
    // }, [location.pathname]);
};

const styles = {
    mainButton: {
        width: '90%',
        marginTop: 10,
    } as React.CSSProperties,
};

export default AnswersContainer;
