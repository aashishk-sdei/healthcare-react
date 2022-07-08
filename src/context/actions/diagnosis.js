import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setparams2,setObject1 } from './general';
toast.configure();

export const list_diagnosis = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/diagnosis`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_DIAGNOSIS", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};



export const diagnosis_detail = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/diagnosis-detail`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                dispatch({ type: "DIAGNOSIS_DETAIL", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};


export const icd_code_all = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/icd-code`, params, token).then((response) => {

            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_ICD_CODE", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};

export const clear_search = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: "LIST_ICD_CODE", data: [] });
    }
};


export const create_diagnosis = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.post(`${apiUrl}3001/diagnosis`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch( setparams2(response.data._id));
                dispatch( setObject1(response.data));
                
                if (response.data) dispatch({ type: "ADD_DIAGNOSIS", data: response.data });
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

export const update_diagnosis = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/diagnosis`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_DIAGNOSIS", data: response.data, flag: data.flag ? true : false });
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



export const update_multi_diagnosis = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/diagnosis`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message)
                dispatch({ type: "UPDATE_MULTI_DIAGNOSIS", data: data });
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

