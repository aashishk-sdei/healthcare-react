import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const list_email_type = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/email-type`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_EMAIL_TYPE", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};


export const list_email_tag = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/tag`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_TAG", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};


export const create_email_type = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.post(`${apiUrl}3001/email-type`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                if (response.data) dispatch({ type: "ADD_EMAIL_TYPE", data: response.data });
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

export const update_email_type = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/email-type`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_EMAIL_TYPE", data: response.data, flag: data.flag ? true : false });
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



export const update_multi_email_type = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/email-type`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message)
                dispatch({ type: "UPDATE_MULTI_EMAIL_TYPE", data: data });
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

// Email Template Manage
export const list_email_template = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/email-template`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_EMAIL_TEMPLATE", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};


export const create_email_template = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.post(`${apiUrl}3001/email-template`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                if (response.data) dispatch({ type: "ADD_EMAIL_TEMPLATE", data: response.data });
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

export const update_email_template = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/email-template`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_EMAIL_TEMPLATE", data: response.data, flag: data.flag ? true : false });
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



export const update_multi_email_template = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/email-template`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message)
                dispatch({ type: "UPDATE_MULTI_EMAIL_TEMPLATE", data: data });
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

export const send_emails = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.post(`${apiUrl}3001/send-mail`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            return callback(response);
            // if (response.messageID === 200) {
            //   toast.success(response.message);
            //   if (response.data) dispatch({ type: "ADD_EMAIL_TEMPLATE", data: response.data });
            //   return callback(response);
            // } else if (response.messageID === 404) {
            //   toast.warn(response.message);
            //   return callback(response);
            // } else {
            //   toast.error(response.message);
            //   return callback(response);
            // }
        });
    }
}