/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Dixit
 */
import axios from "axios";
import querystring from "querystring";
import { setAuthorizationToken } from "../auth";

var config = {
  headers: {
    "Content-Type": "application/json"
  }
};

var langHeaders = () => {
  return { headers: { ...config.headers, lang: "en", "referrermodule": window.location.href } };
};

class ApiClient {
  static post(url, params, token = null) {
    if (token) setAuthorizationToken(axios, token);
    return new Promise((fulfill, reject) => {
      axios
        .post(url, JSON.stringify(params), langHeaders())
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static put(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .put(url, JSON.stringify(params), langHeaders())
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static get(url, params, token = null) {
    setAuthorizationToken(axios, token);
    let query = querystring.stringify(params);
    url = query ? `${url}?${query}` : url;
    return new Promise(function (fulfill, reject) {
      axios
        .get(url, langHeaders())
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static fetch(url, params, token = null) {
    // setAuthorizationToken(axios, token);
    let query = querystring.stringify(params);
    url = query ? `${url}?${query}` : url;
    console.log(url);
    return new Promise(function (fulfill, reject) {
      axios
        .get(url, langHeaders())

        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static patch(url, params, token = null) {
    return new Promise(function (fulfill, reject) {
      axios
        .patch(url, JSON.stringify(params), langHeaders())
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static delete(url, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .delete(url, langHeaders())
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** Form-Data Method without file for Create ***********/
  static _postFormData(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .post(url, params, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })

        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data Method for Update ***********/
  static _putFormData(url, params, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      // var body = new FormData();
      // body.append("file", params);
      axios
        .put(url, params, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })

        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data post with file Method ***********/
  static postFormData(url, body, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise((fulfill, reject) => {
      axios
        .post(url, body, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })

        .then((response) => {
          fulfill(response.data);
        })
        .catch((error) => {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data update with file Method ***********/
  static putFormData(url, body, token = null) {
    setAuthorizationToken(axios, token);
    return new Promise((fulfill, reject) => {
      axios
        .put(url, body, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })
        .then((response) => {
          fulfill(response.data);
        })
        .catch((error) => {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default ApiClient;
