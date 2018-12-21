import axios from 'axios';

const CancleToken = axios.CancelToken;

export const ApiRoot = '';

export default {
    // `url` is the server URL that will be used for the request
    url: '/user',

    // `method` is the request method to be used when making the request
    method: 'get', // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: ApiRoot,

    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
    // FormData or Stream
    // You may modify the headers object.
    transformRequest: [function (data, headers) {
        // Do whatever you want to transform the data

        return data;
    }],

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    transformResponse: [function (data) {
        // Do whatever you want to transform the data

        return data;
    }],

    // `headers` are custom headers to be sent
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 10000, // default is `0` (no timeout)

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false, // default

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // `onUploadProgress` allows handling of progress events for uploads
    onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },

    // `onDownloadProgress` allows handling of progress events for downloads
    onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },

    // `maxContentLength` defines the max size of the http response content in bytes allowed
    maxContentLength: 2000,

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    cancelToken: new CancelToken(function (cancel) {
    })
};