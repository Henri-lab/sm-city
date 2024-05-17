import axios from 'axios'


const gaodeMapAPI = axios.create({
    baseURL: import.meta.env.VITE_gaodeMap_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

gaodeMapAPI.interceptors.request.use(config => {
    config.params = {
        ...config.params,
        key: String(import.meta.env.VITE_gaodeMap_KEY)
    }
    return config
}, errorMessages => {
    console.error('高德地图请求失败:', errorMessages);
    return Promise.reject(errorMessages);
});

gaodeMapAPI.interceptors.response.use(response => {
    if (response.status === 200) return Promise.resolve(response.data);
    else {
        console.error('高德地图响应失败:', response);
        return Promise.reject(response);
    }
})

const cityAndHotCityAPI = axios.create({
    baseURL:'peiqi'
})

cityAndHotCityAPI.interceptors.request.use(config => {
    config.params = config.params || {};
    return config
}, errorMessages => {
    console.error('热门城市请求失败:', errorMessages);
    return Promise.reject(errorMessages);
});

cityAndHotCityAPI.interceptors.response.use(response => {
    if (response.status === 200) return Promise.resolve(response.data);
    else {
        console.error('热门城市响应失败:', response);
        return Promise.reject(response);
    }
})

export { gaodeMapAPI, cityAndHotCityAPI }