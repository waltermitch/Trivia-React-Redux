import React from 'react';
import './LevelItem.css';
import correctIcon from "../../assets/correctIcon.png";

export interface LeveItemProperties {
    level: number;
    text: string;
}

function LevelItem (props:LeveItemProperties) {
    return (
        <div className='level-item'>
            <img className='correct-icon' src={correctIcon} alt='Correct Icon' />
            <div className='text'>{props.text}</div>
        </div>
    );
}

export default LevelItem;
