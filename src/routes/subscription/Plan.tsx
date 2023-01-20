import React from 'react';
import {PlanObject} from "./Plans";

interface PlanParams {
    plan: PlanObject;
    onSelect: Function;
}


const Plan = ({plan, onSelect}: PlanParams) => {
    return (
        <div className='plan' onClick={() => onSelect(plan)}>
            <div className='plan-title'>{`${plan.type === 'monthly' ? 'Monthly Plan' : 'Annual Plan'} ${plan.price}`}</div>
            <div className='plan-message'>
                {`${plan.type === 'monthly' ? 'Billed monthly' : 'Billed annually after the trail ends'}. Cancel any time.`}
            </div>
        </div>
    );
};

export default Plan;
