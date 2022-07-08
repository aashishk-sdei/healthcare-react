import React from "react";
import MediaCell from './mediaCell/mediaCell';
import './mediaList.scss';
const MediaList = ({ data, handleVal, isChecked }) => {
	return (
		<>
			<div className="mediaList">
				<div className="mediaListInner d-flex flex-wrap cursor-medialistner mediaListner-scroll">
					{data.list && data.list.map((item, index) => <MediaCell key={index} _isChecked={e => isChecked(e)} _handleVal={(val) => handleVal(val)} item={item} mediaType={data.mediaType} />)}
				</div>
			</div>
		</>
	)
};

export default MediaList;
