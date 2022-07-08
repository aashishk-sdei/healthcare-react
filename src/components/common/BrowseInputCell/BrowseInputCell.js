import React, { useState } from "react";
import { Button } from 'reactstrap';
import "./BrowseInputCell.scss";
const BrowseInputCell = ({ view, logoUrl, handleImageSelect, fileType="image", acceptFile = "image/x-png,image/gif,image/jpeg", image = true, className = '', displayLabel = "Choose file" }) => {
    const [imgsrc, setImgSrc] = useState(logoUrl);
    const [imgErr, setImgErr] = useState(false);
    const _handleImageSelect = (file) => {
        if (file.type.includes(fileType)) {
            setImgErr(false);
            setImgSrc(URL.createObjectURL(file));
            handleImageSelect(file);
        } else {
            setImgErr(true);
        }
    }

    const handleClearImage = () => {
        setImgSrc('');
        setImgErr(false);
        handleImageSelect('');
    }
    return (
        <>
            <div className={`browseInputCell d-flex ${className}`}>
                <div className="custom-file">
                    <input type="file" accept={acceptFile} disabled={view} className="custom-file-input" id="customFile" title="File Name" onChange={(e) => _handleImageSelect(e.target.files[0])} />
                    <label className="custom-file-label" htmlFor="customFile">{displayLabel}
                    </label>
                </div>
                {image && imgsrc && <span className="browseInputFile rounded-circle flex-shrink-0 deleteimgbtn">
                    <Button theme="link" className="video-del-btn btn-secondary" onClick={() => handleClearImage()}>
                        <i className="material-icons">clear</i>
                    </Button>
                    <img src={imgsrc} alt="Icon" className="rounded-circle img-fluid" />
                </span>}
            </div>
            {image && imgErr && <div className="erro danger">You can only select images.</div>}
        </>
    );
};

export default BrowseInputCell;
