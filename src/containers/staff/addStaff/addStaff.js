import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Form, ListGroup, ListGroupItem } from "shards-react";
import PageHeader from '../../../components/common/PageHeader/PageHeader';
import TabBlock from './tabBlock/tabBlock';
import './addStaff.scss';
import { add_staff, list_view, all_assigned, list_user_type, update_staff, list_clientd, assign_client, list_staff_permission, list_staff_members, list_permission, set_permission, list_staff_cat, add_permission, set_tab } from '../../../context/actions/staff';
import { pagination, sorting } from '../../../utils/constants';

const AddStaff = ({ match, history }) => {
	const dispatch = useDispatch();
	let staffId = useSelector(state => state.general.param1 !== '' ? state.general.param1 : '');
	const isView = match.path.includes("view");
	const isAdd = (match.path.includes("view") || match.path.includes("manage"));
	useEffect(() => {
		if (!isView) {
			dispatch(list_staff_members({ sortBy: 1, sortKey: 'firstname', limit: pagination.maxlimit, page: pagination.page }));
			dispatch(list_staff_cat({ sortBy: sorting.sorty, sortKey: sorting.sortkey, search: '', limit: pagination.maxlimit, page: pagination.page }));
			dispatch(list_user_type({ sortBy: 1, sortKey: 'name', search: '', limit: pagination.maxlimit, page: pagination.page }));
			dispatch(list_view({ sortBy: 1, sortKey: 'name', search: '', limit: pagination.maxlimit, page: pagination.page }));
			dispatch(list_clientd({ sortBy: sorting.sortby, sortKey: sorting.sortkey, search: '', limit: pagination.maxlimit, page: pagination.page }));
			dispatch(all_assigned({ staffId: staffId }));
			dispatch(set_permission());
			dispatch(list_staff_permission({ staffId: staffId }));
			dispatch(list_permission({ staffId: staffId }, (result) => { }));
		}
		dispatch(set_tab('1'));
	}, []);

	let staffdetails = useSelector(state => state.staff.records && isAdd && state.general.param1 && state.general.param1 !== '' && state.staff.records.find(item => item['@rid'] === state.general.param1));
	let staffCategory = useSelector(state => state.staff.liststaff);
	let client = useSelector(state => state.client.clientrecords);
	let usertypedata = useSelector(state => state.staff.users && state.staff.users.filter(item => { if (item.status == 1) { item['name'] = item['name'].length > 110 ? `${item['name'].substring(0, 110)}...` : item['name']; return item; } }));
	let views = useSelector(state => state.staff.views);
	let staffarray = useSelector(state => state.staff.staff_members);
	let allassigned = useSelector(state => state.staff.allassigned);
	let permission = useSelector(state => state.staff.permission);
	let Tab = useSelector(state => state.staff.tab);
	let [flag, setFlag] = useState(false);
	let [staffPayload, setstaffPayload] = useState(false);

	const _saveData = async (data) => {
		if (staffId && staffId !== '') {
			data.recordId = staffId
			await dispatch(assign_client(data, (result) => {
				dispatch(set_tab('1'));
				// if (result.messageID === 201) history.push('/staff-list');
			}));
		}
		else {
			dispatch(assign_client(data, (result) => {
				// if (result.messageID === 201) history.push('/staff-list');
				dispatch(set_tab('3'));
				// window.location.reload();
			}));
		}
	}

	const _submitData = async (data) => {
		const payload = { ...staffPayload, ...data };
		setstaffPayload(payload)
		if (payload['recordId'] && payload['recordId'] !== '') {
			await dispatch(update_staff(payload, result => {
				if (result.messageID === 200) {
					dispatch(set_tab('1'));
					history.push('/staff-list');
				}
			}));
		} else {
			dispatch(add_staff(payload, (result) => {
				dispatch(set_tab('1'));
				if (result.messageID === 201) { staffarray.push(result.data); console.log("Here new updated staff array : ", staffarray); }
				// history.push('/staff-list');
			}));
		}
	}
	const _savePermissionData = async (data, details) => {
		dispatch(add_permission(data, (result) => {
			if (details === undefined) {
				dispatch(set_tab('2'));
				// dispatch(set_permission());
				// console.log("reload")
				// window.location.reload();
			}
			else {
				dispatch(set_tab('1'));
				// if (result.messageID === 200) history.push('/staff-list');
			}

		}));
	}
	const changeStaff = async (data) => {
		dispatch(list_permission({ staffId: data }, (result) => {
			permission = result.data;
			// var permission = useSelector(state => state.staff.permission)
		}));

	}
	return (
		<>
			<PageHeader button={staffdetails && isView} buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" clickEvent={() => history.push('/staff-list')} title={staffdetails ? isView ? 'Staff' : 'Edit Staff' : 'Add Staff Form'} />
			<Row>
				<Col sm="12">
					<Card small className="mb-4" >
						<ListGroup flush>
							<ListGroupItem className="p-3">
								<Row>
									<Col>
										<Form>
											<Row>
												<Col sm="12">
													{/* <TabBlock /> */}
													<TabBlock title="Staff Information" view={views} client={client}
														details={staffdetails} staff={staffarray}
														usertype={usertypedata} allassigned={allassigned}
														staffCategory={staffCategory} Tab={Tab}
														flag={isView ? flag : !flag} editable={!isView} permission={permission}
														setChange={(data) => changeStaff(data)}
														isNext={(data) => _submitData(data)} isSave={(data) => _saveData(data)}
														isSavePermission={(data, details) => _savePermissionData(data, details)}
														cancel={() => history.push('/staff-list')} makeEditale={() => setFlag(!flag)} />
												</Col>
											</Row>
										</Form>
									</Col>
								</Row>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default AddStaff;
