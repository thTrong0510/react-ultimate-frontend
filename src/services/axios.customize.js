import axios from "axios"
import NProgress from 'nprogress';

//loading bar
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});

//can thiệp vào quá trình từ gửi request frontend ... backend
// Set config defaults when creating the instance: tạo một bản sao
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

//can thiệp vào quá trình gửi data từ backend về frontend
// Add a request interceptor
//gán token vào header với interceptor nên viết ở trog .request này vì trước khi gửi request lên server pải đi qa đâyđây
instance.interceptors.request.use(function (config) {
    NProgress.start();
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    NProgress.done();
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();

    //cấu hình lại
    if (response?.data?.data) return response.data;

    //mặc định
    return response;
}, function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    //cấu hình lạilại
    if (error?.response?.data) return error.response.data;

    //mặc định
    return Promise.reject(error);
});

export default instance;