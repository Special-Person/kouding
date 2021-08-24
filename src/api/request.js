let instance = axios.create({
    baseURL: "http://kumanxuan1.f3322.net:8001",
    timeout: 5000
});


instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    token && (config.headers["X-Nideshop-Token"] = token);

    return config;
}, err => Promise.reject(err));

instance.interceptors.response.use(res => res.data, err => Promise.reject(err));

export default instance;
