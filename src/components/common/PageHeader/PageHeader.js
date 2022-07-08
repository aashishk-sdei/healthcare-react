import React, { useState } from "react";
import { Button } from "shards-react";
import PageTitle from "../PageTitle";
import "./PageHeader.scss";
const PageHeader = ({
    title,
    subtitle,
    button = false,
    editCallback,
    clickEvent,
    buttonLabel = '',
    buttonIcon = '',
    className=''
}) => {
    const [edit, setEditView] = useState(true)
    const editViewHandler = () => {
        setEditView(!edit)
        editCallback(edit)
    }
    return (
        <>
            <div className={`page-header py-4 withBtn d-flex align-items-end ${className}`}>
                <PageTitle sm="4" title={title} subtitle={subtitle} className="page-header-col text-sm-left flex-fill" />
                {
                    button ?
                        <Button pill theme="primary" onClick={() => clickEvent()} className="d-inline-flex align-items-center justify-content-center listHeaderBtn btn-sm">
                            <i className="material-icons">
                                {buttonIcon === 'edit' ? 'edit' : ''}
                                {buttonIcon === 'add' ? 'add' : ''}
                                {buttonIcon === 'LeftArrow' ? 'keyboard_arrow_left' : ''}
                            </i>
                            <span>{buttonLabel}</span>
                        </Button> : null
                }
            </div>
        </>
    );
};

export default PageHeader;
