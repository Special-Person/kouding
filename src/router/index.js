import Home from '../views/Home.vue'

// 官方bug => 防止无意义的重定向报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  let result = originalPush.call(this, location)
  return result && result.catch(err => err);
};

const routes = [
  {
    path: '/',
    redirect: { name: "Home" }
  },
  {
    path: '/home',
    name: 'Home',
    meta: { showTabbar: true },
    component: Home,
    children: [
      {
        path: '/home/popup',
        name: 'HomePopup',
        component: () => import(/* webpackChunkName: "Popup"*/ "../views/Popup.vue")
      }
    ]
  },
  {
    path: "/category",
    name: "Category",
    meta: { showTabbar: true },
    component: () => import(/* webpackChunkName: "Category"*/"../views/Category.vue"),
    children: [
      {
        path: '/category/popup',
        name: 'CategoryPopup',
        component: () => import(/* webpackChunkName: "Popup"*/ "../views/Popup.vue")
      }
    ]
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { showTabbar: true },
    component: () => import(/* webpackChunkName: "Cart"*/"../views/Cart.vue")
  },
  {
    path: "/user",
    name: "User",
    meta: { showTabbar: true },
    component: () => import(/* webpackChunkName: "User"*/"../views/User.vue")
  },
  {
    path: "/topic",
    name: "Topic",
    meta: { showTabbar: true },
    component: () => import(/* webpackChunkName: "Topic"*/"../views/Topic.vue")
  },
  {
    // 空白页 用于刷新路由
    path: "/empty",
    name: "Empty",
    meta: { showTabbar: true },
    component: () => import(/* webpackChunkName: "Empty"*/"../views/Empty.vue")
  },
  {
    // 产品页
    path: "/product",
    name: "Product",
    component: () => import(/* webpackChunkName: "Product"*/"../views/Product.vue")
  },
  {
    // 产品详情页
    path: "/product-detail",
    name: "ProductDetail",
    component: () => import(/* webpackChunkName: "ProductDetail"*/"../views/ProductDetail.vue")
  },
  {
    // 产品详情页
    path: "/channel",
    name: "Channel",
    component: () => import(/* webpackChunkName: "Channel"*/"../views/Channel.vue")
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 需要验证身份的路由
let regRoute = ["Cart"];

// 路由拦截
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");

  if (regRoute.includes(to.name) && !token) {

    Vue.prototype.$toast.fail("请先登录");

    next({ path: "/user" });

    return;
  } else {

    next();
  }
});

export default router
