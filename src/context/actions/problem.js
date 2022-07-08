import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setparams2,setObject1 } from './general';
toast.configure();

export const list_problem = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/problem`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_PROBLEM", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};

export const problem_detail = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/problem`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                dispatch({ type: "PROBLEM_DETAIL", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};


export const create_problem = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.post(`${apiUrl}3001/problem`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch( setparams2(response.data[0]['@rid']));
                dispatch( setObject1(response.data[0]));
                if (response.data) dispatch({ type: "ADD_PROBLEM", data: response.data });
                return callback(response);
            } else if (response.messageID === 404) {
                toast.warn(response.message);
                return callback(response);
            } else {
                toast.error(response.message);
                return callback(response);
            }
        });
    }
}

export const update_problem = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/problem`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_PROBLEM", data: response.data, flag: data.flag ? true : false });
                return callback(response);
            } else if (response.messageID === 404) {
                toast.warn(response.message);
                return callback(response);
            } else {
                toast.error(response.message);
                return callback(response);
            }
        });
    }
}

export const update_problem_status = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/problem-status`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_PROBLEM", data: response.data, flag: data.flag ? true : false });
                return callback(response);
            } else if (response.messageID === 404) {
                toast.warn(response.message);
                return callback(response);
            } else {
                toast.error(response.message);
                return callback(response);
            }
        });
    }
}

export const update_multi_problem = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/problem-status`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message)
                dispatch({ type: "UPDATE_MULTI_PROBLEM", data: data });
                return callback(response);
            } else if (response.messageID === 404) {
                toast.warn(response.message);
                return callback(response);
            } else {
                toast.error(response.message);
                return callback(response);
            }
        });
    }
}

