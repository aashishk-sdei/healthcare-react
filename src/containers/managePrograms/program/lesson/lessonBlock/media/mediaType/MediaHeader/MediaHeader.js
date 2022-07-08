import React from "react";
import { Button } from 'reactstrap';
import { CardHeader } from "shards-react";
import Heading4 from '../../../../../../../../components/common/Heading4/Heading4';

const MediaHeader = (
    {
title='',
buttonTitle=''
    }
) => {
    return (
        <>
            <CardHeader>
                <Heading4 className="d-flex lession-section-ttl mb-0">
                    <label className="mb-0 flex-fill">
                        {title}
                    </label>
                    {/* <Button color="link" className="p-0">
                        {buttonTitle}
                    </Button> */}
                </Heading4>
            </CardHeader>
        </>
    )
};

export default MediaHeader;
