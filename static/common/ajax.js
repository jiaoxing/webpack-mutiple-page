
// import axios from 'axios';

//
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//
//     // config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     // if (config.method == 'post') {
//     //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//     // }
//
//     //逐级遍历对象的属性，去除空格
//     let trim = function (obj) {
//         for (let key in obj) {
//             if (obj[key]) {
//                 if (typeof(obj[key]) === 'string') {
//                     obj[key] = obj[key].trim();
//                 } else if (typeof(obj[key]) === 'object') {
//                     trim(obj[key]);
//                 }
//             }
//         }
//     };
//
//     //提交数据前，去除首尾空格
//     let data = config.params || config.data || {};
//     trim(data);
//
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });
//
//
// axios.interceptors.response.use(function (response) {
//     //处理200返回码
//     if(response && response.status == '200' && response.data) {
//         let result = response.data;
//         if (result.success) {
//             return result;
//         } else {
//             //处理全局错误
//             if (result.code == '401') {
//                 alert('登录超时，请重新登录');
//                 window.location.reload(true);
//             } else {
//                 // let errorMsg = error.SYSTEM_ERROR[result.code] || error.SYSTEM_ERROR.DEFAULT;
//                 // alert(errorMsg);
//                 return result;
//             }
//         }
//
//     } else {
//         return response;
//     }
//
// }, function (err) {
//     debugger;
//     let errorMsg = error.NETWORK_ERROR[err.status] || error.SYSTEM_ERROR.DEFAULT;
//     alert(errorMsg);
//     return Promise.reject(error);
// });
//
// export default axios;
