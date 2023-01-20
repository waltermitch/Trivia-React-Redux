import React from 'react';

export interface CorrectAnswerContainerParams {
    text: string | undefined;
    image: string | undefined;
}

const CorrectAnswerContainer = ({text, image}:CorrectAnswerContainerParams) => {
    return (
        <div className='white-container answer'>
            <div className="question-image-cover">
                {image && <img className='question-image' src={`${process.env.REACT_APP_BASE_URL}${image}`} alt='QuestionModel' />}
            </div>
            <span><b>Answer:</b></span>
            <span>{text}</span>
        </div>
    );
};

export default CorrectAnswerContainer;
