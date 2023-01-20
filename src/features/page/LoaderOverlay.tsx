import React from 'react';
import './LoaderOverlay.css';
import ClipLoader from "react-spinners/ClipLoader";

export interface LoaderParams {
    loadingText?: boolean;
}

const LoaderOverlay = (params: LoaderParams) => {
    const { loadingText } = params;
    return (
        <div className='loader-overlay'>
            <ClipLoader color={'#ffffff'} loading={true}
                        css={'z-index: 1; display: block; position: absolute;' + (!loadingText ? 'top: 50%; left: 50%; margin: -32px -32px;' : '')}
                        size={loadingText ? 110 : 64}/>
            {loadingText && <p className="loader-text">Loading...</p>}
        </div>
    );
};

export default LoaderOverlay;