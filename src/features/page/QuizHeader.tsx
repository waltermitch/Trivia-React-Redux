import React from 'react';
import { useUser } from "../../app/hooks";
import star from "../../assets/star.png";
import starProgress from '../../assets/starProgress.png';
import trophy from '../../assets/trophy.png';
import ProgressBar from '../progress-bar/ProgressBar';
import './QuizHeader.css';

export interface HeaderProps {

}

function QuizHeader() {
    const user = useUser();
    return (
        <div className='quiz-header'>
            <div className='tokens-container'>
                {user && <div className='tokens'>Current Tokens: {user.tokens}</div>}
                <img className='star' src={star} alt='Token Star' />
            </div>
            {user && <div className="progress-label">{`Answer ${user.next_level_requirements.correct} Out of ${user.next_level_requirements.num} Correctly`}</div>}
            <div className='progress'>
                <img className='star-icon' src={starProgress} alt='Star Icon' />
                {user && <ProgressBar
                    latest={user.current_level_latest_votes.latest}
                    maxValue={user.next_level_requirements.num} />}
                <img className='trophy-icon' src={trophy} alt='Trophy Icon' />
            </div>
        </div>
    );
}

export default QuizHeader;
