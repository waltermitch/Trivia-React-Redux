import React from 'react';
import './ProgressBar.css';

export interface ProgressBarParams {
    latest:number[];
    minValue?:number;
    maxValue?:number;
    label?:boolean;
}

const ProgressBar = ({latest, maxValue = 100, minValue = 0, label = true}:ProgressBarParams) => {

    const percent = 100 / maxValue;
    const latestReversed = latest ? [...latest].reverse() : [];

    return (
        <div dir="ltr" className="progress-bar">
            <div className="progress-container">
                <div className="progress-completed">
                    {latestReversed.map((item, index) => {
                        // map each part into separate div and each will be animated
                        // because of the "transition: width 2s;" css in class "progressVisualPart"
                        // and because of the new width ("widths[index]", previous one was 0)
                        return (
                            <div
                                // There won't be additional changes in the array so the index can be used
                                /* eslint-disable-next-line react/no-array-index-key */
                                key={index}
                                style={{
                                    width: `calc(${percent}% - 1px)`,
                                    height: `100%`,
                                    marginRight: '1px'
                                }}
                                className={item === 1 ? 'correct' : 'wrong'}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
