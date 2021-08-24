import request from "./request";

// 首页
export const getHomeData = () => request.get("/index/index");

// 搜索页 历史搜索 热门搜索
export const getHomePopupData = () => request.get("/search/index");

// 搜索商品列表
export const getSearchKeyword = params => request.get("/goods/list", {params});

// 实时搜索商品列表
export const getRealTimeSearchKeyword = params => request.get("/search/helper", {params});

// 清除历史记录
export const clearHistory = () => request.post("/search/clearhistory");

// 登录
export const loginUser = data => request.post("/auth/loginByWeb", data);

// 产品明细
export const queryProduct = params => request.get("/goods/detail", {params});

// 相关产品
export const queryRelatedProduct = params => request.get("/goods/related", {params});

// 购物车产品数量
export const getCartCount = () => request.get("/cart/goodscount");

// 加入购物车
export const addCart = data => request.post("/cart/add", data);

// 获取购物车数据
export const getCartItem = () => request.get("/cart/index");

// 删除购物车商品
export const deleteCartProduct = data => request.post("/cart/delete", data);

// 商品步进器
export const updateCartProduct = data => request.post("/cart/update", data);

// 全部分类数据
export const getAllCategory = () => request.get("/catalog/index");

// 当前分类数据
export const getCurCategory = params => request.get("/catalog/current", {params});

// 分类数据获取
export const getGoodsCategory = params => request.get("/goods/category", {params});

// 分类页面商品列表请求
export const getGoodsList = params => request.get("/goods/list", {params});

// topic专题页面数据请求
export const getTopicList = params => request.get("/topic/list", {params});

