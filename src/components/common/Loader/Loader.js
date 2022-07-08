import React from "react";
import { Spinner } from 'reactstrap';
import "./Loader.scss";
const LoaderUI = (
    {
        className = '',
        loader = true,
        overlay = false,        
        overlayRadius = 0,
        FullWindow = false,
        color = 'primary',
        size='',
        customSize=''
        
    }
) => (
        <>
            <div className={`loaderWrapper d-flex align-items-center justify-content-center 
            ${className} 
            ${FullWindow ? 'position-fixed' : 'position-absolute'}
            `}>

                {
                    overlay ? <span className={`loaderOverlay position-absolute ${overlayRadius}`}></span> : null
                }
                {
                    loader ? <Spinner color={color} size={size} className={`position-relative large ${customSize}`} /> : null
                }

            </div>
        </>
    );


export default LoaderUI;
