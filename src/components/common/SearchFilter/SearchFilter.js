import React, { useState } from "react";
import { FormInput } from "shards-react";
import "./SearchFilter.scss";
const SearchFilter = ({ makeSearch }) => {

	let [isEmpty, setEmpty] = useState(true);
	let [searchKey, setSearchKey] = useState('');

	const onKeyDownEvent = (event) => {
		if (event.key === 'Enter') { makeSearch(event.target.value); }
		if (event.target.value !== 0) setEmpty(false);
	}
	const handleChange = (val) => {
		if (val === '' || val.length === 0) { setSearchKey(''); setEmpty(true); }
		else setSearchKey(val);
	}

	return (
		<>
			<div className="listSearchCell position-relative flex-fill">
				<button className="btn btn-link position-absolute p-0 d-inline-flex align-items-center justify-content-center clearSearchBtn">
					{isEmpty ? <i className="material-icons" onClick={() => makeSearch(searchKey)}>search</i> : <i className="material-icons text-danger" onClick={() => { setSearchKey(''); setEmpty(true); makeSearch('') }}>close</i>}
				</button>
				<FormInput placeholder="Press enter to search" type="text" value={searchKey} onChange={($event) => handleChange($event.target.value)} onKeyDown={($event) => onKeyDownEvent($event)} />
			</div>
		</>
	);
};

export default SearchFilter;
