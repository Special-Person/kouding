import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/reset.css"
import "@/vantui"

Vue.config.productionTip = false


Vue.filter("filterPrice", price => "¥ " + Number(price).toFixed(2) + " 元");


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
