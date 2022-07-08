import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../../components/common/TableList/TableList';
import { list_client, delete_client, update_client, update_multi_client, exportcsv, list_all_client } from '../../../context/actions/client';
import { pagination, sorting } from './../../../utils/constants';
import csc from 'country-state-city'

const GroupList = ({ history }) => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(pagination.page);
  let [sortKey, setSortKey] = useState('createdOn');
  let [sortBy, setSortBy] = useState(sorting.sortby);
  let [search, setSearch] = useState('');
  const [countries] = useState(csc.getAllCountries());

  useEffect(() => {
    dispatch(list_client({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: page }));
    dispatch(list_all_client());
  }, []);

  let client = useSelector(state => state.client);
  let clientArray = []
  var json = client.csvrecord
  json.map(function (object) {
    let country = '';
    let state = '';
    let city = '';

    const coun = countries[countries.findIndex(e => e.id === object.country)];
    if (coun && coun.id) {
      country = coun.name;
      const states = csc.getStatesOfCountry(coun.id);
      const st = states[states.findIndex(e => e.id === object.state)];
      if (st && st.id) {
        state = st.name;
        const cities = csc.getCitiesOfState(st.id);
        const ct = cities[cities.findIndex(e => e.id === object.city)];
        if (ct && ct.id) {
          city = ct.name;
        }
      }
    }

    let newJsonObject = {
      "Client Name": "", "Client Email": "", "Client Phone": "", "Address": "", "City": "", "State": "", "Country": "", "Zip Code": "", "Full Name": "", "Email": "", "Position": "", "Phone": ""
    };
    newJsonObject["Client Name"] = (object)["contactName"];
    newJsonObject["Client Email"] = (object)["contactEmail"];
    newJsonObject["Client Phone"] = (object)["contactPhone"];
    newJsonObject["Address"] = (object)["addressLine1"];
    newJsonObject["City"] = city;
    newJsonObject["State"] = state;
    newJsonObject["Country"] = country;
    newJsonObject["Zip Code"] = (object)["zipcode"];
    newJsonObject["Full Name"] = (object)["fullname"];
    newJsonObject["Email"] = (object)["email"];
    newJsonObject["Position"] = (object)["position"];
    newJsonObject["Phone"] = (object)["phone"];
    clientArray.push(newJsonObject)
  })

  const _handleDelete = (rid) => {
    dispatch(delete_client({ status: 0, recordId: rid }, result => {
      if (result.messageID === 200) {
        let newPage = page;
        if (page > (client.count - 1 / pagination.limit)) { newPage = newPage - 1; setPage(newPage); }
        dispatch(list_client({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: newPage }));
      }
    }));
  }
  const _handleToggle = (state, rid) => {
    // return false
    dispatch(update_client({ isActive: state ? true : false, recordId: rid }));

  }
  const _handlePageChange = (activePage) => {
    setPage(activePage);
    dispatch(list_client({ sortBy: sortBy, sortKey: sortKey, search: search, limit: pagination.limit, page: activePage }));
  }
  const _handleSelected = (key, rid) => {
    let obj = {
      recordIds: rid
    };
    if (key === 'Active') obj.isActive = true;
    if (key === 'Inactive') obj.isActive = false;
    if (key === 'Delete') obj.isDeleted = true;
    dispatch(update_multi_client(obj));
  };

  const _handleSearch = async (key) => {
    await setSearch(key);
    dispatch(list_client({ sortBy: sortBy, sortKey: sortKey, search: key, limit: pagination.limit, page: 1 }));
  }

  const _handleSorting = async (sortkey, sortby) => {
    await setSortBy(sortby); await setSortKey(sortkey);
    dispatch(list_client({ sortBy: sortby, sortKey: sortkey, search: search, limit: pagination.limit, page: page }));
  }
  // } 
  const handleExportcsv = () => {
    console.log("clickedcsv")
    dispatch(exportcsv((result) => {

    })
    )
  }

  return (
    <>
      <TableList
        list={client.records}
        count={client.count}
        type={'Client'}
        page={page}
        sortkey={sortKey}
        sortby={sortBy}
        clientArray={clientArray}
        handleDelete={(id) => _handleDelete(id)}
        handleToggle={(state, id) => _handleToggle(state, id)}
        handlePageChange={(page) => _handlePageChange(page)}
        handleSelectedAction={(key, id) => _handleSelected(key, id)}
        handleSearch={(key) => _handleSearch(key)}
        handleSorting={(key, by) => _handleSorting(key, by)}
        handleexportCsv={() => handleExportcsv()}
        history={history}
      />
    </>
  )
};

export default GroupList;
