import {motion, Variants} from 'framer';
import React from 'react';

export interface QuestionTextParams {
    category: string;
    text: string;
    variants: Variants;
}

const QuestionText = ({category, text, variants}: QuestionTextParams) => {
    return (
        <motion.div className='white-container question-text' variants={variants}>
            <div className='category'>{category}</div>
            <span className='text'>{text}</span>
        </motion.div>
    );
};

export default QuestionText;
